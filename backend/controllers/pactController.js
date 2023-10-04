const {PactInfo} = require('../models/models')
const {Application} = require('../models/models')
const {Coordinate} = require('../models/models')
const {Conversation} = require('../models/models')
const {Member} = require('../models/models')
const ApiError = require('../error/ApiError')

class CustomerController{
    async createPact(req, res) { 
        try {
            const {applicationId, contractorId, dateOfConclusion} = req.body
            const application = await Application.findOne({ where: { id: applicationId }});
            if (application)
            {
                await application.update({status: 'current'})
                const pact = await PactInfo.create({dateOfConclusion, userId: contractorId, applicationId})

                const conversations = await Conversation.findAll({
                    where: {applicationId},
                    include:[{model: Member}]
                })

                for (const item of conversations) 
                {
                    if (item.members[0].dataValues.userId != contractorId && item.members[1].dataValues.userId != contractorId)
                    {
                        await item.destroy()
                    }
                }
                
                return res.json(pact)
            }
            else  
            {
                next(ApiError.badRequest('Записи не существует'))
            }          
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCurrent(req, res) {
        const {userId} = req.params
        let pact = await Application.findAll({
            where: {userId, status: 'current'},
            include: [
                {model: Coordinate},
                {model: PactInfo}
            ],
        })
        if (!pact.length)
        {
            pact = await Application.findAll({
                where: {status: 'current'},
                include: [
                    {model: Coordinate},
                    {
                        model: PactInfo,
                        where: {userId}
                    }
                ],
            })
        }
            
        return res.json(pact)
    }

    async getCompleted(req, res) {
        const {userId} = req.params
        let pact = await Application.findAll({
            where: {userId, status: 'completed'},
            include: [
                {model: Coordinate},
                {model: PactInfo}
            ],
        })
        if (!pact.length)
        {
            pact = await Application.findAll({
                where: {status: 'completed'},
                include: [
                    {model: Coordinate},
                    {
                        model: PactInfo,
                        where: {userId}
                    }
                ],
            })
        }
            
        return res.json(pact)
    }

    async changeStatusOnCompleted(req, res) {
        try {
            const {id} = req.body
            const pact = await Application.findOne({where: {id, status: "current"}})
            if (pact) {
                await pact.update({status: 'completed'})
            }
            else
            {
                next(ApiError.badRequest('Записи не существует'))
            }
            return res.json(pact)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CustomerController()