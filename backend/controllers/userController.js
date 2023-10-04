const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const {ContractorInfo} = require('../models/models')

const generateJwt = (id, email, name, activity) => {
    return jwt.sign({id, email, name, activity}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class CustomerController{
    async registrationCustomer(req, res, next) {
       const {email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued} = req.body
       if (!email || !password){
        return next(ApiError.badRequest('Некорректный E-mail или пароль'))
       }
       const candidate = await User.findOne({where: {email}})
       if (candidate){
        return next(ApiError.badRequest('Пользователь с таким E-mail уже существует'))
       }

       const hashPassword = await bcrypt.hash(password, 5)
       const user = await User.create({email, password: hashPassword, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued, activity: 'customer'})
       
       
       const FIO = `${surname} ${name.slice(0,1)}. ${patronymic.slice(0,1)}.`
       const token = generateJwt(user.id, email, FIO, 'customer')
       
       return res.json({token})
    }

    async registrationContractor(req, res, next) {
       const {email, password, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued, invoiceForPayment} = req.body
       if (!email || !password){
        return next(ApiError.badRequest('Некорректный E-mail или пароль'))
       }
       const candidate = await User.findOne({where: {email}})
       if (candidate){
        return next(ApiError.badRequest('Пользователь с таким E-mail уже существует'))
       }

       const hashPassword = await bcrypt.hash(password, 5)
       const user = await User.create({email, password: hashPassword, name, surname, patronymic, passportSeries, passportNumber, dateOfIssue, whoIssued, activity: 'contractor'})
       
       await ContractorInfo.create({userId: user.id, invoiceForPayment})
       
       const FIO = `${surname} ${name.slice(0,1)}. ${patronymic.slice(0,1)}.`
       const token = generateJwt(user.id, email, FIO, 'contractor')
       
       return res.json({token})
    }


    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Некорректный E-mail или пароль'))
           }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Неверные E-mail или пароль'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.badRequest('Неверные E-mail или пароль'))
        }

        const FIO = `${user.surname} ${user.name.slice(0,1)}. ${user.patronymic.slice(0,1)}.`
        const token = generateJwt(user.id, user.email, FIO, user.activity)
        return res.json({token})
    }

    async check(req, res) {
        const token  = generateJwt(req.user.id, req.user.email, req.user.name, req.user.activity)
        return res.json({token})
    }
}

module.exports = new CustomerController()