const MSSV = '23IT155';
module.exports = {
  mssv: MSSV,
  name: process.env.STUDENT_NAME || 'Nguyen Thi Ly',
  prefix: MSSV.slice(-3),               // "155"
  vat: Number(MSSV.slice(-1)) + 5       // 5 + 5 = 10 (%)
};