const {MovieStudio, Genre} = require('../models/models');
const ApiError = require('../error/ApiError');
class MovieStudioRouter {
    async create(req, res) {
        const {name} = req.body;
        const movieStudio = await MovieStudio.create({name});
        return res.json(movieStudio)
    }
    async getAll(req, res) {
        const movieStudio = await MovieStudio.findAll();
        return res.json(movieStudio)
    }
}

module.exports = new MovieStudioRouter()