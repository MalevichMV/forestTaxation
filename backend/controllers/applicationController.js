const {Application} = require('../models/models')
const {Coordinate} = require('../models/models')
const ApiError = require('../error/ApiError')

class ApplicationController{
    async add(req, res, next) {
        try {
            const {endDate, cost, typeOfWork, coordinates, customerId} = req.body
            const application = await Application.create({endDate, cost, typeOfWork, userId: customerId, status: "active"})

            for (const item of coordinates) {
                await Coordinate.create({
                  northernLatitude: item.lat,
                  eastLongitude: item.lng,
                  applicationId: application.id
                });
            }

            return res.json(application)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getById(req, res) {
       const {id} = req.params
       const application = await Application.findAll({
            where: {userId: id, status: "active"},
            include: [{model: Coordinate}]
        })
       return res.json(application)
    }

    async getAll(req, res) {
        const application = await Application.findAll({ 
            where: {status: "active"},   
            include: [{model: Coordinate}] 
        })
        return res.json(application)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const application = await Application.findOne({where: {id, status: "active"}})
        if (application)
        {
            await application.destroy();
            return res.sendStatus(204);
        }
        else
        {
            next(ApiError.badRequest('Записи не существует'))
        }
    }
}

module.exports = new ApplicationController()