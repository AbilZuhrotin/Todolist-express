const usersModel = require('../models/users');

module.exports = {
    login: (req, res) => {
        res.json({
            message: "login",
            data: usersModel
        });
    },

    register: (req, res) => {
        const input = req.body; 
        const newUser = {
            id_user: usersModel.length + 1,
            ...input,
        };
        usersModel.push(newUser);
        res.json({
            message: "register",
            data: newUser,
        });
    }
};