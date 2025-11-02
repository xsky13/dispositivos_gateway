const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    if (req.path.startsWith("/public")) {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SIGN_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded;
        return next();
    });
};

module.exports = { authMiddleware }
