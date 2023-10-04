const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    passportSeries: {type: DataTypes.INTEGER},
    passportNumber: {type: DataTypes.INTEGER},
    dateOfIssue: {type: DataTypes.DATE},
    whoIssued: {type: DataTypes.STRING},
    activity: {type: DataTypes.STRING}
})

const ContractorInfo = sequelize.define('contractorInfo', {
    invoiceForPayment: {type: DataTypes.STRING}
})

const PactInfo = sequelize.define('pactInfo', {
    dateOfConclusion: {type: DataTypes.DATE}
})

const Application = sequelize.define('application', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    endDate: {type: DataTypes.DATE},
    cost: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING},
    typeOfWork: {type: DataTypes.STRING}
})

const Conversation = sequelize.define('conversation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true}
})

const Member = sequelize.define('member', {})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    text: {type: DataTypes.STRING},
    sendingDate: {type: DataTypes.DATE}
})

const Coordinate = sequelize.define('coordinate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    northernLatitude: {type: DataTypes.FLOAT},
    eastLongitude: {type: DataTypes.FLOAT}
})

User.hasOne(ContractorInfo, {onDelete: 'CASCADE'})
ContractorInfo.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(Member, {onDelete: 'CASCADE'})
Member.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(PactInfo, {onDelete: 'CASCADE'})
PactInfo.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(Application, {onDelete: 'CASCADE'})
Application.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(Message, {onDelete: 'CASCADE'})
Message.belongsTo(User, {onDelete: 'CASCADE'})

Conversation.hasMany(Member, {onDelete: 'CASCADE'})
Member.belongsTo(Conversation, {onDelete: 'CASCADE'})
Conversation.hasMany(Message, {onDelete: 'CASCADE'})
Message.belongsTo(Conversation, {onDelete: 'CASCADE'})

Application.hasMany(Conversation, {onDelete: 'CASCADE'})
Conversation.belongsTo(Application, {onDelete: 'CASCADE'})
Application.hasMany(Coordinate, {onDelete: 'CASCADE'})
Coordinate.belongsTo(Application, {onDelete: 'CASCADE'})
Application.hasOne(PactInfo, {onDelete: 'CASCADE'})
PactInfo.belongsTo(Application, {onDelete: 'CASCADE'})


module.exports = {
    User,
    ContractorInfo,
    PactInfo,
    Application,
    Conversation,
    Member,
    Message,
    Coordinate
}
