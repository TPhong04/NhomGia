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

// Dữ liệu bài viết blog
let posts = [
  {
    id: 1,
    title: "Giới thiệu dự án Blog Nhóm",
    description: "Bài viết đầu tiên giới thiệu về dự án blog của chúng tôi",
    content: "Đây là dự án blog được xây dựng bằng Node.js và Express...",
    category: "cong-nghe",
    author: "Dương Thanh Phong",
    createdAt: new Date().toLocaleDateString("vi-VN")
  }
];

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
app.get('/', (req, res) => {
  res.render('home', { posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  console.log('Từ khóa tìm kiếm:', searchQuery);

  let teamResults = [];
  let postResults = [];

  if (searchQuery) {
    const queryLower = searchQuery.toLowerCase();

    // Lọc thành viên nhóm
    teamResults = teamMembers.filter(member => 
      member.name.toLowerCase().includes(queryLower) ||
      member.mssv.includes(searchQuery) ||
      member.class.toLowerCase().includes(queryLower) ||
      member.address.toLowerCase().includes(queryLower)
    );

    // Lọc bài viết
    postResults = posts.filter(post => 
      post.title.toLowerCase().includes(queryLower) ||
      post.description.toLowerCase().includes(queryLower) ||
      post.author.toLowerCase().includes(queryLower) ||
      (post.content && post.content.toLowerCase().includes(queryLower))
    );
  }

  res.render('search', { searchQuery, teamResults, postResults });
});

app.get('/team', (req, res) => {
  res.render('team');
});

// Route hiển thị form viết bài
app.get('/blogs/create', (req, res) => {
  res.render('create');
});

// Route xử lý đăng bài viết
app.post('/blogs/create', (req, res) => {
  // Tạo bài viết mới với ID tự động tăng
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author,
    createdAt: new Date().toLocaleDateString("vi-VN"),
    // Thêm các trường tùy chọn theo chủ đề
    ...req.body
  };

  // Thêm bài viết vào đầu mảng (mới nhất lên trên)
  posts.unshift(newPost);
  console.log('Đã thêm bài viết:', newPost);

  // Chuyển hướng về trang chủ
  res.redirect('/');
});

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
