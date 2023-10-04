const {Message} = require('../models/models')
const ApiError = require('../error/ApiError')

class MessageController{
    async createMessage(req, res, next) {
        try {
            const {conversationId, senderId, text, sendingDate} = req.body
            const message = await Message.create({conversationId, userId: senderId, text, sendingDate})
            return res.json(message)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getMessages(req, res) {
        const {id} = req.params
        const messageList = await Message.findAll({where: {conversationId: id}})
        return res.json(messageList)
    }
}

module.exports = new MessageController()