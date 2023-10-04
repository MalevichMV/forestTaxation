const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registrationCustomer', userController.registrationCustomer)
router.post('/registrationContractor', userController.registrationContractor)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router