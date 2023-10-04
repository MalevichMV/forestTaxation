const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const applicationRouter = require('./applicationRouter')
const pactRouter = require('./pactRouter')
const conversationRouter = require('./conversationRouter')
const messageRouter = require('./messageRouter')

router.use('/user', userRouter)
router.use('/application', applicationRouter)
router.use('/pact', pactRouter)
router.use('/conversation', conversationRouter)
router.use('/message', messageRouter)


module.exports = router