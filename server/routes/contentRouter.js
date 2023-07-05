const Router = require('express');
const router = new Router();
const contentController  = require('../controllers/contentContoller');
const genreController = require('../middleware/checkRoleMiddleware');
const basketController = require('../controllers/bassketController')

router.post('/', genreController('ADMIN'), contentController.create);
router.post('/addBasketContent', basketController.addToBasket);
router.post('/delBasketContent', basketController.removeFromBasket);
router.get('/getUserBasket', basketController.showUserBasket)
router.get('/', contentController.getAll);
router.get('/', contentController.getOne);

module.exports = router;