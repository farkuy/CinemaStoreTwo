const Router = require('express');
const router = new Router();
const genreController  = require('../controllers/genreContoller');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), genreController.create)
router.get('/', genreController.getAll)
router.post('/setNameList', genreController.setNameList)
router.post('/getNameList', genreController.getNameList)

module.exports = router