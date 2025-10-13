const usersModel = require('../models/users');

module.exports = {
    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await usersModel.findOne({ email: email, password: password });
            if (!user) {
                return res.status(404).json({
                    message: "User tidak ditemukan",
                });
            }
            res.json({
                message: "User ditemukan",
                data: user,
            });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat mencari user",
            error: error.message,
        });
    }
},

    register: (req, res) => {
        try {
            const { username, fullname, email, password } = req.body;
            const newUser = new usersModel ({
                username,
                fullname,
                email,
                password
        });
        newUser.save();
        res.status(201).json({
            message: "User berhasil ditambahkan",
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat menambahkan user",
            error: error.message,
        });
    }}
};