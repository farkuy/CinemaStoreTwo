const Router = require('express');
const router = new Router();
const contentController  = require('../controllers/contentContoller');
const genreController = require('../middleware/checkRoleMiddleware')

router.post('/', genreController('ADMIN'), contentController.create);
router.get('/', contentController.getAll);
router.get('/', contentController.getOne);

module.exports = router;