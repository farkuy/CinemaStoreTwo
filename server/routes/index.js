const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const genreRouter = require('./genreRouter');
const movieStudioRouter = require('./movieStudioRouter');
const contentRouter = require('./contentRouter');


router.use('/user', userRouter)
router.use('/genre', genreRouter)
router.use('/movieStudio', movieStudioRouter)
router.use('/content', contentRouter)

module.exports = router