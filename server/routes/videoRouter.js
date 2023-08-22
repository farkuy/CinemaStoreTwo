const Router = require('express');
const router = new Router();
const videoController  = require('../controllers/videoController');

router.post('/createVideo', videoController.createAndCheckVideo)

module.exports = router
