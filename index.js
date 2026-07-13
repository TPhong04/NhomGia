const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Morgan
app.use(morgan('combined'));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
