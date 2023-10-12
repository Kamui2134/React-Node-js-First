const db = require('./db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('./config');
const uuidv4 = require('uuid');

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const data = req.body; // Входные данные, отправленные с клиента
            // Здесь можно обработать данные и отправить ответ
            const query = await db.query(`SELECT EXISTS (SELECT 1 FROM person WHERE username = $1) AS exists`, [data.username]);
            const condidate = query.rows[0].exists;
            if (condidate) {
                return res.json({message: 1});
            }
            const uuid = uuidv4.v4();
            const hashPassword = bcrypt.hashSync(data.password, 7);
            await db.query(`INSERT INTO person (id, username, password, role) values ($1, $2, $3, $4) RETURNING *`, [uuid, data.username, hashPassword, data.role]);
            console.log('Получены данные от клиента:', data.username);
            return res.json({message: 0});
        } catch (e) {
            console.log(e);
            res.json({message: e});
        }
    }

    async login(req, res) {
        try {
            const data = req.body; // Входные данные, отправленные с клиента
            // Здесь можно обработать данные и отправить ответ
            const query = await db.query(`SELECT * FROM person WHERE username=$1`, [data.username]);
            const user = query.rows[0];
            if (!user) {
                return res.json({message: 1.1});
            }
            const validPassword = bcrypt.compareSync(data.password, user.password);
            if (!validPassword) {
                return res.json({message: 1.2});
            }
            const token = generateAccessToken(user.id, user.role);
            return res.json({message: 0});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e})
        }
    }

    async getUsers(req, res) {
        try {
            const data = req.body; // Входные данные, отправленные с клиента
            // Здесь можно обработать данные и отправить ответ
            const query = await db.query(`SELECT * FROM person`);
            const users = query.rows;
            return res.json({message: users});
        } catch (e) {
            res.status(400).json({message: e})
        }
    }
}

module.exports = new authController();