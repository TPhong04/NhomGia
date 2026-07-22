const { getAllPosts, searchPosts } = require('../models/postModel');
const { getAllMembers, searchMembers } = require('../models/teamModel');

function renderHome(req, res) {
  res.render('home', { posts: getAllPosts() });
}

function renderAbout(req, res) {
  res.render('about');
}

function renderContact(req, res) {
  res.render('contact');
}

function renderSearch(req, res) {
  const searchQuery = req.query.q;

  console.log('Từ khóa tìm kiếm:', searchQuery);

  res.render('search', {
    searchQuery,
    teamResults: searchMembers(searchQuery),
    postResults: searchPosts(searchQuery),
  });
}

function renderTeam(req, res) {
  res.render('team', { members: getAllMembers() });
}

module.exports = {
  renderHome,
  renderAbout,
  renderContact,
  renderSearch,
  renderTeam,
};
