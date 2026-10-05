const router = require('express').Router();
const { BookRead, BookWrite } = require('../models/Book');
const student = require('../config/student');

// READ -> tài khoản reader
router.get('/', async (req, res) => {
  try {
    const books = await BookRead.find().sort({ createdAt: -1 }).lean();
    res.render('home', { books });
  } catch (e) {
    res.status(500).send('Lỗi đọc dữ liệu: ' + e.message);
  }
});

router.get('/add', (req, res) => res.render('add'));

// WRITE -> tài khoản writer
router.post('/add', async (req, res) => {
  const maSP = (req.body.maSP || '').trim();
  const tenSach = (req.body.tenSach || '').trim();
  const tacGia = (req.body.tacGia || '').trim();
  const giaGoc = Number(req.body.giaGoc);
  const form = { maSP, tenSach, tacGia, giaGoc: req.body.giaGoc };

  // Bộ lọc: mã phải bắt đầu bằng 3 số cuối MSSV
  if (!maSP.startsWith(student.prefix)) {
    return res.status(400).render('add', {
      error: `Mã sản phẩm phải bắt đầu bằng "${student.prefix}". Hệ thống từ chối xử lý.`, form
    });
  }
  if (!tenSach || !Number.isFinite(giaGoc) || giaGoc < 0) {
    return res.status(400).render('add', { error: 'Tên sách hoặc giá không hợp lệ.', form });
  }

  // VAT động: (chữ số cuối MSSV + 5)%
  const giaSauThue = Math.round(giaGoc * (1 + student.vat / 100) * 100) / 100;

  try {
    await BookWrite.create({ maSP, tenSach, tacGia, giaGoc, vat: student.vat, giaSauThue });
    req.session.flash = `Đã thêm "${tenSach}" (giá sau thuế ${giaSauThue}).`; // lưu trong session ở Atlas
    res.redirect('/');
  } catch (e) {
    res.status(500).render('add', { error: 'Lỗi ghi dữ liệu: ' + e.message, form });
  }
});

module.exports = router;