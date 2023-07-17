const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/searchUser', authMiddleware, userController.searchUser);
router.post('/requestAddNewAdmin', userController.requestAddNewAdmin);
router.get('/showInviteAcceptance', authMiddleware, userController.showInviteAcceptance);
router.get('/acceptTheInvitation', authMiddleware, userController.acceptTheInvitation);




module.exports = router
