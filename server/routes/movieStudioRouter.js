const Router = require('express')
const router = new Router()
const movieStudioController  = require('../controllers/movieStudioContoller')
const genreController = require('../middleware/checkRoleMiddleware')

router.post('/', genreController('ADMIN'), movieStudioController.create)
router.get('/', movieStudioController.getAll)

module.exports = router