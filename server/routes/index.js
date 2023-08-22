const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const genreRouter = require('./genreRouter');
const movieStudioRouter = require('./movieStudioRouter');
const contentRouter = require('./contentRouter');
const reviewRouter = require('./reviewRouter');
const videoRouter = require('./videoRouter');
const commentRouter = require('./commentRouter')

router.use('/user', userRouter);
router.use('/genre', genreRouter);
router.use('/movieStudio', movieStudioRouter);
router.use('/content', contentRouter);
router.use('/review', reviewRouter)
router.use('/video', videoRouter)
router.use('/comment', commentRouter)

module.exports = router