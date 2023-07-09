const {Basket, BasketContent, Contents} = require('../models/models');
const ApiError = require('../error/ApiError');
const {json} = require("express");
const {DataTypes} = require("sequelize");

class BasketController {
    async addToBasket(req, res, next) {
        const { userId, contentId, contentInfo } = req.body;

        try {
            const existingContent = await Contents.findOne({ where: {id: contentId,} });
            if(existingContent) {
                const basket = await Basket.findOne({ where: { id: userId } });
                console.log(33)
                if (!basket) {
                    return next(ApiError.internal(`Пользователь с таким id не найден`));
                }
                const basketCheck = await BasketContent.findOne({where: {basketId: basket.id, contentId: contentId}});
                if (basketCheck) {
                    return res.json({ message: 'Вы уже добавили этот контент' });
                }
                await BasketContent.create({ basketId: basket.id, contentId });
                return res.json({ message: 'Добавлено' });
            } else {
                const newContent = await Contents.create({
                    id: contentId,
                    nameRu: contentInfo.nameRu,
                    nameEn: contentInfo.nameEn,
                    posterUrl: contentInfo.posterUrl,
                    posterUrlPreview: contentInfo.posterUrlPreview,
                    filmId: contentInfo.filmId,
                    year: contentInfo.year,
                    genres: contentInfo.genres,
                    countries: contentInfo.countries,
                    rating: contentInfo.rating,
                    ratingVoteCount: contentInfo.ratingVoteCount,
                    ratingChange: contentInfo.ratingChange,
                    filmLength: contentInfo.filmLength});
                const basket = await Basket.findOne({ where: { userId } });
                if (!basket) {
                    return next(ApiError.internal(`Пользователь с таким id не найден`));
                }
                await BasketContent.create({ basketId: basket.id, contentId });
            }
        } catch (error) {
            console.log(error)
            return next(ApiError.internal('Произошла ошибка при добавлении контента в корзину'));
        }
    }

    async removeFromBasket(req, res, next) {
        const { basketContentId, userId } = req.query;
        try {
            const deletedRows = await BasketContent.destroy({ where: { basketId: userId, contentId: basketContentId} });
            if (deletedRows === 0) {
                return next(ApiError.internal('Запись в корзине с таким ID не найдена'));
            }
            return res.json({ message: 'Контент успешно удален из корзины' });
        } catch (error) {
            return next(ApiError.internal('Произошла ошибка при удалении контента из корзины'));
        }
    }

    async showUserBasket(req, res, next) {
        const { userId } = req.query;
        try {
            const allContent = await BasketContent.findAll({ where: { basketId: userId } });
            const arrInfo = [];
            for (const content of allContent) {
                const contentInfo = await Contents.findOne({ where: { filmId: content.contentId } });
                if (contentInfo) {
                    arrInfo.push(contentInfo);
                }
            }
            return res.json(arrInfo);
        } catch (error) {
            return res.json({ error });
        }
    }
}

module.exports = new BasketController();
