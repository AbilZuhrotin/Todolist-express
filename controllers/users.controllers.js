const usersModel = require('../models/users');

module.exports = {
    login: (req, res) => {
        const id = req.params.id;
        const user = usersModel.find((item) => item.id_user === Number(id));
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }
        res.json({
            message: "User ditemukan",
            data: user,
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