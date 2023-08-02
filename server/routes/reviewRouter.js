const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/reviewController')

router.get('/showAllFilmReview', reviewController.showAllMovieReview);
router.delete('/deleteUserReview', reviewController.deleteUserReview);

module.exports = router