const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Sequelize} = require("sequelize");
const {User, Review} = require("../models/models");

class ReviewController {
    async showAllMovieReview (req, res, next) {
        try {
            const {userId, filmId} = req.query;
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return next(ApiError.internal(`Пользователь с таким именем не найден`));
            }
            const reviewUser = await Review.findOne({where: {userId: userId, filmId: filmId}});
            const allFilmReviews = await Review.findAll({where: {filmId: filmId}});
            if (!allFilmReviews) {
                return res.json([])
            }
            allFilmReviews.sort((a, b) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            })
            return res.json(allFilmReviews)
        } catch (e) {
            console.log(e)
            throw new Error(`Ошибка при выводе рецензий`)
        }
    }
    async deleteUserReview (req, res, next) {
        try {
            const {userId, filmId} = req.query;
            console.log(userId, filmId)
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return next(ApiError.internal(`Пользователь с таким именем не найден`));
            }
            const reviewUser = await Review.findOne({where: {userId: userId, filmId: filmId}});
            if (!reviewUser) {
                return next(ApiError.internal(`Такой рецензии не существует`));
            }

            reviewUser.destroy();
            reviewUser.save();
            return res.json('Рецензия была удалена')
        } catch (e) {
            console.log(e)
            throw new Error(`Ошибка при удалении рецензии`)
        }
    }
}

module.exports = new ReviewController();
