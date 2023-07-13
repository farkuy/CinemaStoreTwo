const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket, BecomeAnAdministrator} = require('../models/models');
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

    async requestAddNewAdmin(req, res, next) {
        const {id} = req.body;
        const user = await User.findOne({where: { id } })
         if (!user) {
             return next(ApiError.internal(`Пользователь с таким именем не найден`));
         }
         const invAdmin = await BecomeAnAdministrator.findOne({where: {id: user.id}})
        if (!invAdmin) {
            const newInvitation = await BecomeAnAdministrator.create({
                id: user.id,
                email: user.email,
                role: 'ADMIN',
            })
            return res.json('Пользователю отправленно предложение стать Администратором')
        }
        return res.json('Пользователю уже было отправленно предложение стать Администратором')
    }

    async searchUser(req, res, next) {
        const {email} = req.query;
        const userList = await User.findAll({where: {
            email: {
                    [Sequelize.Op.like]: `%${email}%`,
                },}})
        if (!userList) {
            return next(ApiError.internal(`Пользователь с таким именем не найден`));
        }
        return res.json(userList)
    }
}

module.exports = new UserController();