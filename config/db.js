const mongoose = require('mongoose');

// autoIndex/autoCreate tắt để user không có quyền createIndex/createCollection không bị lỗi
const opts = { dbName: process.env.DB_NAME, autoIndex: false, autoCreate: false };

const readConn = mongoose.createConnection(process.env.MONGO_URI_READ, opts);
const writeConn = mongoose.createConnection(process.env.MONGO_URI_WRITE, opts);

readConn.on('connected', () => console.log('[DB] READ connection OK'));
writeConn.on('connected', () => console.log('[DB] WRITE connection OK'));
readConn.on('error', (e) => console.error('[DB] READ error:', e.message));
writeConn.on('error', (e) => console.error('[DB] WRITE error:', e.message));

module.exports = { readConn, writeConn };