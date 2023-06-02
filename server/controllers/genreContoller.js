const {Genre} = require('../models/models');
const ApiError = require('../error/ApiError');

class genreController {
    async create(req, res) {
        const {name} = req.body;
        const genre = await Genre.create({name});
        return res.json(genre)
    }
    async getAll(req, res) {
        const types = await Genre.findAll();
        return res.json(types)
    }
}

module.exports = new genreController()
