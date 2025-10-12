const usersModel = require('../models/users');

module.exports = {
    login: (req, res) => {
        res.json({
            message: "login",
            data: usersModel
        });
    },

    register: (req, res) => {
        res.json({
            message: "register",
        });
    }
};