const Router = require('express');
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const commentController = require('../controllers/commentController');
const router = new Router();

router.post('/postComment', commentController.postComment);
router.get('/getComment', authMiddleware, commentController.getAllComment);
router.post('/delComment', commentController.deleteUserComment);

module.exports = router
