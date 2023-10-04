const {Conversation} = require('../models/models')
const {Application} = require('../models/models')
const {Member} = require('../models/models')
const ApiError = require('../error/ApiError')

class ConversationController{
    async createConversation(req, res, next) {
        try {
            const {id, contractorId} = req.body
            const application = await Application.findOne({where: {id}})
            if (application)
            {
                const conversation = await Conversation.create({applicationId: id})
                await Member.create({conversationId: conversation.id, userId: contractorId})
                await Member.create({conversationId: conversation.id, userId: application.userId})
                const result = await Conversation.findOne({
                    where: {id: conversation.id},
                    include: [{model: Member}]
                })

                return res.json(result)
            }
            else 
            {
                next(ApiError.badRequest("Записи не существует"))
            } 
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getConversationByContractor(req, res) {
        const {id, contractorId} = req.params
        const conversation = await Conversation.findAll({
            where: {applicationId: id},
            include: [{model: Member}]
        })
        const result = conversation.filter((elem) => 
            (elem.members[0].dataValues.userId == contractorId  || elem.members[1].dataValues.userId == contractorId))
                            
        return res.json(result)
    }

    async getConversationByCustomer(req, res) {
        const {id} = req.params
        const conversation = await Conversation.findAll({
            where: {applicationId: id},
            include: [{model: Member}]
        })
        return res.json(conversation)
    }
}

module.exports = new ConversationController()