const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = require('connect-mongo');

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_WRITE,
    dbName: process.env.DB_NAME,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'interval',
    autoRemoveInterval: 10
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
});