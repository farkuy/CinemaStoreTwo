const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Video, Comment} = require("../models/models");

class VideoController {
    async createAndCheckVideo(req, res, next) {
        try {
            const { url, duration } = req.body;

            const video = await Video.findOne({where: {url: url}});
            if (video) {
                return res.json(`Видео найденно`)

            };
            const newVideo = await Video.create(
                {
                    url: url,
                    duration: duration,
                }
            )
            return res.json(`Создано видео`)
        } catch (e) {
            console.log(e);
            throw new Error('Ошибка при проверке видео');
        }
    }

}

module.exports = new VideoController();