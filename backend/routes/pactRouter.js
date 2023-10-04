const Router = require('express')
const router = new Router()
const pactController = require('../controllers/pactController')

router.post('/', pactController.createPact)
router.post('/changeOnCompleted', pactController.changeStatusOnCompleted)
router.get('/current/:userId', pactController.getCurrent)
router.get('/completed/:userId', pactController.getCompleted)

module.exports = router