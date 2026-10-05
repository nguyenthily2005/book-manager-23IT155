require('dotenv').config();
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const sessionMiddleware = require('./config/session');
const booksRouter = require('./routes/books');
const student = require('./config/student');

const app = express();
app.set('trust proxy', 1);                       // bắt buộc trên Render (cookie secure)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use((req, res, next) => {
  res.locals.student = student;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
app.use('/', booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server chạy cổng ' + PORT));