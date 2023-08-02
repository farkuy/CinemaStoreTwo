const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, BecomeAnAdministrator, InviteToAGroups, GrroupBB} = require('../models/models');
const {Sequelize} = require("sequelize");

const generateJwt = (id, email, role) => {
    const token = jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '2d' }
    );
    return (token);
};

class AdminController {
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

    async createGroup(req, res, next) {
        try {
            const {adminId, groupName} = req.body;
            const group = await GrroupBB.findOne({where: {groupName: groupName}})
            if (group) {
                return res.json('Группа с таким именем уже существует')
            } else {
                const newGroup = await GrroupBB.create({
                    adminId: adminId,
                    groupName: groupName
                })
                return res.json('Группа успешно создана')
            }
        } catch (e) {
            console.log(`Что-то пошло не так`, e)
            throw new Error(e)
        }
    }
    async inviteToAGroup(req, res, next) {
        try {
            const {adminId, groupName, userName} = req.body;
            const user = await User.findOne({where: {email: userName}})
            if (!user) {
                return res.json('Пользователь с таким именем не найден')
            }
            const group = await GrroupBB.findOne({where: {groupName: groupName, adminId: adminId}})
            if (group) {
                if (group.users.includes(user)) {
                    return res.json('Пользователь уже есть в группе')
                }
                const invite = await InviteToAGroups.findOne({where: {email: userName, groupName: groupName}})
                if (invite) {
                    return res.json('Пользователь уже приглашен в группу');
                }

                const newInvite = await InviteToAGroups.create({
                    email: userName,
                    groupName: groupName,
                })
                return res.json('Пользователь приглашен в группу в группу')
            } else {
                return res.json('У вас нет доступа к этой группе')
            }
        } catch (e) {
            console.log(`Что-то пошло не так`, e)
            throw new Error(e)
        }
    }
}

module.exports = new AdminController();