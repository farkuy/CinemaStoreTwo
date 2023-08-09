const {Genre, ContentListNames} = require('../models/models');
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
    async setNameList(req, res, next) {
        try
        {
            const {route, typeName, listNames} = req.body;
            console.log(route, typeName, listNames)
            const list = await ContentListNames.findOne({ where: {routeName: route, typeName: typeName} })
            if (!list)
            {
                const newList = await ContentListNames.create({
                    routeName: route,
                    typeName: typeName,
                    listRoue: listNames
                })
                return res.json(newList.listRoue)
            }
            return res.json(list.listRoue)
        }
        catch (e)
        {
            throw new Error(e);
            console.log(`Ошибка при занесении`)
        }
    }

    async getNameList(req, res, next) {
        try
        {
            const {route, typeName} = req.body;
            console.log(route, typeName)
            const list = await ContentListNames.findOne({ where: {routeName: route, typeName: typeName} })
            if (!list) return res.json(false)
            return res.json(list.listRoue)
        }
        catch (e)
        {
            throw new Error(e);
            console.log(`Ошибка при выдаче списка нименований`)
        }
    }
}

module.exports = new genreController()
