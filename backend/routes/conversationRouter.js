const Router = require('express')
const router = new Router()
const conversationController = require('../controllers/conversationController')

router.post('/createConversation', conversationController.createConversation)
router.get('/getConversationByContractor/:id/:contractorId', conversationController.getConversationByContractor)
router.get('/getConversationByCustomer/:id', conversationController.getConversationByCustomer)

module.exports = router