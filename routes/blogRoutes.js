const express = require('express');

const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/create', blogController.renderCreateForm);
router.post('/create', blogController.storePost);
router.get('/:id', blogController.renderPostDetail);

module.exports = router;
