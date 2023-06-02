const uuid = require('uuid');
const path = require('path');
const {Content, ContentInfo} = require('../models/models');
const ApiError = require('../error/ApiError')
class ContentRouter {
    async create(req, res, next) {
        try {
            let {name, genreId, movieStudioId, info} = req.body;
            const {img} = req.files;
            const fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const content = await Content.create({name, genreId, movieStudioId, img: fileName});

            if(info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    ContentInfo.create({
                        title: i.title,
                        description: i.description,
                        contentId: content.id,
                    })
                )
            }

            return res.json(content)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res) {
        let {genreId, movieStudioId, limit, page} = req.query;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let contents;
        if(!movieStudioId && !genreId) {
            contents = await Content.findAndCountAll({limit, offset})
        }
        if(movieStudioId && !genreId) {
            contents = await Content.findAndCountAll({where: {movieStudioId}, limit, offset})
        }
        if(!movieStudioId && genreId) {
            contents = await Content.findAndCountAll({where: {genreId}, limit, offset})
        }
        if(movieStudioId && genreId) {
            contents = await Content.findAndCountAll({where: {genreId, movieStudioId}, limit, offset})
        }
        return res.json(contents)
    }

    async getOne(req, res) {
        const {id} = req.params
        const contents = await Content.findOne(
            {
                where: {id},
                include: [{model: ContentInfo, as: 'info'}]
            },
        )
        return res.json(contents)
    }
}

module.exports = new ContentRouter();