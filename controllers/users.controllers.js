const bcrypt = require("bcryptjs");
const usersModel = require('../models/users');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await usersModel.find();  
            res.json({
                message: "Menampilkan semua user",
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil user",
                error: error.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await usersModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "User tidak ditemukan",
                });
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Password salah",
                });
            }
            res.json({
                message: "Login berhasil",
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

            const duplikatEmail = usersModel.findOne({ email });
            if (duplikatEmail) {
                return res.status(400).json({
                    message: "Email sudah terdaftar",
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new usersModel ({
                username,
                fullname,
                email,
                password: hash
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