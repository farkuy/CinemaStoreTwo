const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/showInviteAcceptance', authMiddleware, userController.showInviteAcceptance);
router.get('/showInviteGroup', authMiddleware, userController.showInviteGroup);
router.get('/acceptTheInvitation', authMiddleware, userController.acceptTheInvitation);
router.get('/checkReview', authMiddleware, userController.checkReview);
router.post('/acceptTheInvitationToAGroup', userController.acceptTheInvitationToAGroup);
router.post('/addReview', userController.addReview);
router.post('/editReview', userController.editReview);



router.get('/searchUser', authMiddleware, adminController.searchUser);
router.post('/requestAddNewAdmin', adminController.requestAddNewAdmin);
router.post('/createNewGroup', adminController.createGroup);
router.post('/inviteToAGroup', adminController.inviteToAGroup);


module.exports = router
