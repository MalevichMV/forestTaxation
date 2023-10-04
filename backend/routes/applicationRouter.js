const Router = require('express')
const router = new Router()
const ApplicationController = require('../controllers/applicationController')

router.post('/', ApplicationController.add)
router.get('/all', ApplicationController.getAll)
router.get('/:id', ApplicationController.getById)
router.delete('/delete/:id', ApplicationController.delete)

module.exports = router