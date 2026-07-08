const express = require('express');
const morgan = require('morgan'); // Khai báo morgan
const app = express();
const port = 3000;

// Tích hợp morgan vào app
app.use(morgan('combined'));

// CSS dùng chung cho toàn bộ trang
const baseStyle = `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .card {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
      padding: 50px 40px;
      width: 100%;
      animation: fadeIn 0.6s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h1 {
      color: #4b2e83;
      font-size: 2rem;
      margin-bottom: 10px;
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: #888;
      margin-bottom: 30px;
      font-size: 1rem;
    }

    .nav {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 30px;
    }

    .nav a {
      text-decoration: none;
      color: #764ba2;
      font-weight: 600;
      padding: 8px 18px;
      border: 2px solid #764ba2;
      border-radius: 30px;
      transition: all 0.3s ease;
    }

    .nav a:hover {
      background: #764ba2;
      color: #fff;
    }

    .info-list {
      list-style: none;
    }

    .info-list li {
      display: flex;
      padding: 14px 0;
      border-bottom: 1px solid #eee;
      font-size: 1.05rem;
    }

    .info-list li:last-child {
      border-bottom: none;
    }

    .info-list .label {
      min-width: 130px;
      font-weight: 700;
      color: #4b2e83;
    }

    .info-list .value {
      color: #333;
      flex: 1;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 auto 20px auto;
    }

    .welcome-text {
      text-align: center;
      font-size: 1.2rem;
      color: #444;
      line-height: 1.6;
    }

    /* CSS cho nhóm */
    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
    }

    .member-card {
      background: #f9f9ff;
      border-radius: 15px;
      padding: 30px 25px;
      border: 2px solid #e9e4f7;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .member-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(118, 75, 162, 0.2);
    }

    .member-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0 auto 15px auto;
    }

    .member-name {
      text-align: center;
      color: #4b2e83;
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .member-info {
      list-style: none;
    }

    .member-info li {
      display: flex;
      padding: 8px 0;
      font-size: 0.95rem;
    }

    .member-info .label {
      min-width: 90px;
      font-weight: 600;
      color: #764ba2;
    }

    .member-info .value {
      color: #555;
      flex: 1;
    }
  </style>
`;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Blog cá nhân</title>
      ${baseStyle}
    </head>
    <body>
      <div class="card">
        <div class="avatar">TP</div>
        <h1>Chào mừng đến với Blog cá nhân của tôi!</h1>
        <p class="subtitle">Nơi chia sẻ những điều thú vị trong cuộc sống</p>
        <div class="nav">
          <a href="/">Trang chủ</a>
          <a href="/gioithieu">Giới thiệu</a>
        </div>
<p class="welcome-text">
          Rất vui khi bạn ghé thăm trang Blog cá nhân của tôi. Hãy nhấn vào mục
          "Giới thiệu" để tìm hiểu thêm về tôi nhé!
        </p>
      </div>
    </body>
    </html>
  `);
});

app.get('/gioithieu', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Thông tin cá nhân</title>
      ${baseStyle}
    </head>
    <body>
      <div class="card">
        <div class="avatar">TP</div>
        <h1>Thông tin cá nhân</h1>
        <p class="subtitle">Một vài điều về tôi</p>
        <div class="nav">
          <a href="/">Trang chủ</a>
          <a href="/gioithieu">Giới thiệu</a>
        </div>
        <ul class="info-list">
          <li><span class="label">Tên:</span><span class="value">Dương Thanh Phong</span></li>
          <li><span class="label">Tuổi:</span><span class="value">22</span></li>
          <li><span class="label">Giới tính:</span><span class="value">Nam</span></li>
          <li><span class="label">Ngày sinh:</span><span class="value">20/12/2004</span></li>
          <li><span class="label">MSSV:</span><span class="value">2306022002</span></li>
          <li><span class="label">Lớp:</span><span class="value">17THC</span></li>
          <li><span class="label">Địa chỉ:</span><span class="value">Cần Thơ</span></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});