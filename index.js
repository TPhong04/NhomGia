const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

// Dữ liệu thành viên nhóm
const teamMembers = [
  {
    name: "Trần Thế Đình",
    age: 21,
    gender: "Nam",
    birthday: "28/06/2005",
    mssv: "2306022032",
    class: "17THC",
    address: "TP.HCM",
    avatar: "/img/td.jpg" // Thay bằng tên file ảnh thật
  },
  {
    name: "Dương Thanh Phong",
    age: 22,
    gender: "Nam",
    birthday: "20/12/2004",
    mssv: "2306022002",
    class: "17THC",
    address: "Cần Thơ",
    avatar: "/img/thanhphong.jpg"
  },
  {
    name: "Phan Thị Thanh Hoài",
    age: 21,
    gender: "Nữ",
    birthday: "26/11/2005",
    mssv: "2306012019",
    class: "17THC",
    address: "Đắk Lắk",
    avatar: "/img/th.jpg" // Thay bằng tên file ảnh thật
  }
];

// Static files
app.use(express.static(path.join(__dirname, 'public')));

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
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Morgan
app.use(morgan('combined'));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  console.log("Từ khóa tìm kiếm:", searchQuery);

  let results = [];
  if (searchQuery) {
    // Lọc thành viên theo tên, MSSV, lớp, địa chỉ
    results = teamMembers.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mssv.includes(searchQuery) ||
      member.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  res.render('search', { searchQuery, results });
});

app.get('/team', (req, res) => {
  res.render('team');
});

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
