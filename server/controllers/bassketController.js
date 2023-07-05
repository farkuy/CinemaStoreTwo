const {Basket, BasketContent, Content} = require('../models/models');
const ApiError = require('../error/ApiError');
const {json} = require("express");

class BasketController {
    async addToBasket(req, res, next) {
        const { userId, contentId, contentInfo } = req.body;
        try {
            const existingContent = await Content.findOne({ where: {id: contentId,} });

            if(existingContent) {
                const basket = await Basket.findOne({ where: { id: userId } });
                if (!basket) {
                    return next(ApiError.internal(`Пользователь с таким id не найден`));
                }
                const basketCheck = await BasketContent.findOne({where: {basketId: basket.id, contentId}});
                if (basketCheck) {
                    return res.json({ message: 'Вы уже добавили этот контент' });
                }
                await BasketContent.create({ basketId: basket.id, contentId });
                return res.json({ message: 'Добавлено' });
            } else {
                const newContent = await Content.create({ id: contentId, name: contentInfo.filmId,
                    rating: 0,
                    img: '' });
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
        const { basketContentId, contentId } = req.params;
        try {
            const deletedRows = await BasketContent.destroy({ where: { id: basketContentId } });
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
        console.log(userId)
        try {
            const allContent = await BasketContent.findAll({where: {basketId: userId}});
            return res.json(allContent)
        } catch (error) {
            return res.json({error})
        }
    }
}

module.exports = new BasketController();
