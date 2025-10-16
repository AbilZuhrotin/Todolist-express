const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  verifikasiToken: (req, res, next) => {
    try {
    const header = req.header("Authorization");
      if (!header) {
        return res
          .status(401)
          .json("Header tidak ditemukan. Akses ditolak.");
      }
      const token = header.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Akses ditolak. Token tidak ditemukan." });
      }
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Token tidak valid." });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token tidak valid." });
    }
  },
};
