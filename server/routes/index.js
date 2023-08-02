const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const genreRouter = require('./genreRouter');
const movieStudioRouter = require('./movieStudioRouter');
const contentRouter = require('./contentRouter');
const reviewRouter = require('./reviewRouter')


router.use('/user', userRouter);
router.use('/genre', genreRouter);
router.use('/movieStudio', movieStudioRouter);
router.use('/content', contentRouter);
router.use('/review', reviewRouter)

module.exports = router