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
            const {userId, url, userName, text, avatar, role, date, timeCodeList} = req.body;
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
                timecodeList: timeCodeList,
            });

            return res.json(comment)
        } catch (e) {
            console.log(e)
            throw new Error(`Ошибка при отправке комментария`)
        }
    }

    async deleteUserComment (req, res, next) {
        try {
            const {userName, url, textStr} = req.body;
            const user = await User.findOne({ where: { email: userName } });
            if (!user) {
                return next(ApiError.internal(`Пользователь с таким именем не найден`));
            }
            const commentUser = await Comment.findOne({where: {userName: userName, url: url, text: textStr}});
            if (!commentUser) {
                return next(ApiError.internal(`Такого комментария не существует`));
            }

            commentUser.destroy();
            commentUser.save();
            return res.json('Комментарий был удален')
        } catch (e) {
            console.log(e)
            throw new Error(`Ошибка при удалении комментария`)
        }
    }
}

module.exports = new CommentController();