const posts = [
  {
    id: 1,
    title: 'Giới thiệu dự án Blog Nhóm',
    description: 'Bài viết đầu tiên giới thiệu về dự án blog của chúng tôi',
    content: 'Đây là dự án blog được xây dựng bằng Node.js và Express...',
    category: 'cong-nghe',
    author: 'Dương Thanh Phong',
    createdAt: new Date().toLocaleDateString('vi-VN'),
  },
];

function getAllPosts() {
  return posts;
}

function getPostById(postId) {
  const normalizedId = Number(postId);
  return posts.find((post) => post.id === normalizedId);
}

function searchPosts(query) {
  if (!query) {
    return [];
  }

  const normalizedQuery = query.toLowerCase();

  return posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedQuery) ||
    post.description.toLowerCase().includes(normalizedQuery) ||
    post.author.toLowerCase().includes(normalizedQuery) ||
    (post.content && post.content.toLowerCase().includes(normalizedQuery))
  );
}

function createPost(formData) {
  const newPost = {
    id: posts.length + 1,
    title: formData.title,
    description: formData.description,
    content: formData.content,
    category: formData.category,
    author: formData.author,
    createdAt: new Date().toLocaleDateString('vi-VN'),
    ...formData,
  };

  posts.unshift(newPost);
  return newPost;
}

module.exports = {
  getAllPosts,
  getPostById,
  searchPosts,
  createPost,
};
