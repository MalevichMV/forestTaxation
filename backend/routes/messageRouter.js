const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')

router.post('/createMessage', messageController.createMessage)
router.get('/getMessages/:id', messageController.getMessages)

module.exports = router