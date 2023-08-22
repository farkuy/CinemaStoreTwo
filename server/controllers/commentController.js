const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Review, Comment} = require("../models/models");

class CommentController {
    async getAllComment (req, res, next) {
        try {
            const {userId, url} = req.query;
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return next(ApiError.internal(`Пользователь с таким именем не найден`));
            }
            const allComment = await Comment.findAll({ where: { url: url } });
            if (!allComment) {
                return res.json([])
            }
            return res.json(allComment)
        } catch (e) {
            console.log(e)
            throw new Error(`Ошибка при выводе комментариев`)
        }
    }

    async postComment (req, res, next) {
        try {
            const {userId, url, userName, text, avatar, role, date, timecodeList} = req.body;
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return next(ApiError.internal(`Пользователь с таким именем не найден`));
            }
            const comment = await Comment.create( {
                url: url,
                userName: userName,
                text: text,
                avatar: avatar,
                role: role,
                date: date,
                timecodeList:timecodeList,
            });

            return res.json(comment)
        } catch (e) {
            console.log(e)
            throw new Error(`Ошибка при отправке комментария`)
        }
    }
}

module.exports = new CommentController();