const express = require('express');

const siteController = require('../controllers/siteController');

const router = express.Router();

router.get('/', siteController.renderHome);
router.get('/about', siteController.renderAbout);
router.get('/contact', siteController.renderContact);
router.get('/search', siteController.renderSearch);
router.get('/team', siteController.renderTeam);

module.exports = router;
