const Router = require('express')
const router = new Router()
const controller = require('./authController')
const authMiddleware = require('./middlewares/authMiddleware')
const roleMiddleware = require('./middlewares/roleMiddleware')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['user']), controller.getUsers)

module.exports = router