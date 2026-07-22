const { createPost, getPostById } = require('../models/postModel');

function renderCreateForm(req, res) {
  res.render('create');
}

function storePost(req, res) {
  const newPost = createPost(req.body);

  console.log('Đã thêm bài viết:', newPost);

  res.redirect('/');
}

function renderPostDetail(req, res) {
  const post = getPostById(req.params.id);

  if (!post) {
    return res.status(404).send('Không tìm thấy bài viết bạn yêu cầu.');
  }

  res.render('blog-detail', { post });
}

module.exports = {
  renderCreateForm,
  storePost,
  renderPostDetail,
};
