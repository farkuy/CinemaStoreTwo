const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket, BecomeAnAdministrator, InviteToAGroups, GrroupBB, ReviewWwSW} = require('../models/models');
const {Sequelize} = require("sequelize");

const generateJwt = (id, email, role) => {
    const token = jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '2d' }
    );
    return (token);
};

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest(`Некорректный email или password`));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest(`Данный email зарегистрирован`));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const basket = await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal(`Пользователь с таким именем не найден`));
        }
        const passwordMatched = bcrypt.compareSync(password, user.password);
        if (!passwordMatched) {
            return next(ApiError.internal(`Указан неверный пароль`));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const {email} = req.query;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal(`Пользователь с таким именем не найден`));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }


    async showInviteAcceptance(req, res, next) {
        const {email} = req.query;
        const invAdmin = await BecomeAnAdministrator.findOne({where: {email: email}});
        if (!invAdmin) {
            return res.json('Нет действующих приглашений стать администратором')
        }
        return res.json('Вас приглашают стать администратором')
    }

    async acceptTheInvitation(req, res, next) {
        try {
            const {email} = req.query;
            const invAdmin = await BecomeAnAdministrator.findOne({where: {email: email}});
            if (!invAdmin) {
                return res.json('Нет действующих приглашений, что-то пошло не так')
            }
            const user = await User.findOne({where: {email: email}});
            if (!user) {
                return res.json('Такой пользователь не найден')
            }
            user.role = 'ADMIN';
            await user.save()
            await invAdmin.destroy();
            await invAdmin.save();
            return res.json('Вы стали администратором')
        } catch (e) {
            console.log(e)
            throw new Error('Ошибка при повышении пользователя');
        }
    }

    async showInviteGroup(req, res, next) {
        const {email} = req.query;
        const invite = await InviteToAGroups.findAll({where: {email: email}});
        if (!invite) {
            return res.json('Нет действующих приглашений вступить в группу')
        }
        return res.json(invite)
    }

    async acceptTheInvitationToAGroup(req, res, next) {
        try {
            const { groupName, userName} = req.body;
            const user = await User.findOne({where: {email: userName}});
            const group = await GrroupBB.findOne({where: {groupName: groupName}});

            if (!group) {
                return res.json('Группы с таким именем не существует')
            };
            if (!user) {
                return res.json('Мы не нашли такого пользователя')
            };

            const check = group.users.includes(user);
            if (check) {
                return res.json('Вы уже состоите в этой группе')
            } else {
                group.users.push(user);
                await group.save();

                const invite = await InviteToAGroups.findOne({where: {email: userName, groupName: groupName}})
                invite.destroy();
                invite.save();

                return res.json('Вы вступили в группу')
            }
        } catch (e) {
            console.log(e);
            throw new Error('Ошибка при вступленни в группу');
        }
    }

    async editReview(req, res, next) {
        try {
            const { filmId, userName, textReview, userId, appraisal } = req.body;

            const user = await User.findOne({where: {email: userName}});
            if (!user) {
                return res.json('Мы не нашли такого пользователя')
            };
            const review = await ReviewWwSW.findOne({where:
                    {
                        filmId: filmId,
                        userId: userId,
                        userName: userName,
                    }
            })
            if (!review) {
                return res.json('Отзыв не был найден')
            }
            review.appraisal = appraisal;
            review.text = textReview;
            review.save()

            return res.json('Ваша рецензия изменена')
        } catch (e) {
            console.log(e);
            throw new Error('Ошибка при изменении отзыва');
        }
    }

    async checkReview(req, res, next) {
        try {
           const { filmId, userName, userId } = req.query;
           console.log(filmId)
            const user = await User.findOne({where: {email: userName}});
            if (!user) {
                return res.json('Мы не нашли такого пользователя')
            };

            const review = await ReviewWwSW.findOne({where:
                    {
                        filmId: filmId,
                        userId: userId,
                        userName: userName,
                    }
            });

            if (review) {
                return res.json(review)
            }
            return res.json(false)
        } catch (e) {
            console.log(e);
            throw new Error('Ошибка при проверке наличия комментария');
        }
    }

    async addReview(req, res, next) {
        try {
            const { filmId, userName, textReview, userId, appraisal } = req.body;

            const user = await User.findOne({where: {email: userName}});
            if (!user) {
                return res.json('Мы не нашли такого пользователя')
            };

            const review = await ReviewWwSW.findOne({where:
                    {
                        filmId: filmId,
                        userId: userId,
                        userName: userName,
                    }
            })
            if (review) {
                return res.json('Вы уже оставляли рецензию на этот фильм')
            }
            const newReview = await ReviewWwSW.create({
                text: textReview,
                filmId: filmId,
                userId: userId,
                userName: userName,
                appraisal: appraisal,
            })
            return res.json('Ваша рецензия добавлена')
        } catch (e) {
            throw new Error(e);
            console.log('Ошибка при добавлении рецензии', e)
        }


    }
}

module.exports = new UserController();