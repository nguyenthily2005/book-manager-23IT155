const { Schema } = require('mongoose');
const { readConn, writeConn } = require('../config/db');

const bookSchema = new Schema({
  maSP:       { type: String, required: true },
  tenSach:    { type: String, required: true },
  tacGia:     { type: String, default: '' },
  giaGoc:     { type: Number, required: true },
  vat:        { type: Number, required: true },
  giaSauThue: { type: Number, required: true }
}, { timestamps: true });

module.exports = {
  BookRead:  readConn.model('Book', bookSchema, 'books'),
  BookWrite: writeConn.model('Book', bookSchema, 'books')
};