const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const siteRoutes = require('./routes/siteRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const port = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware phân giải dữ liệu từ form và JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    substring: function (str, start, length) {
      if (str && str.length > 0) {
        return str.substring(start, start + length);
      }
      return '';
    },
    eq: function (a, b) {
      return a === b;
    },
    or: function (a, b) {
      return a || b;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Morgan
app.use(morgan('combined'));

// Routes
app.use('/', siteRoutes);
app.use('/blogs', blogRoutes);

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
