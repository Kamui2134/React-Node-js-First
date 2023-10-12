const jwt = require("jsonwebtoken");
const {secret} = require("../config");

module.exports = function (roles) {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const userRoles = jwt.verify(token, secret)
            let hasRole = false
            if(roles.includes(userRoles.role)) {
                hasRole = true
            }
            if (!hasRole) {
                return res.status(403).json({massage: "У вас нет доступа"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Возникла ошибка"})
        }
    }
};