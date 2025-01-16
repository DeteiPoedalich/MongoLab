const Router = require('express')
const router = new Router()
const itemController=require("../controllers/itemController")

router.post('/',itemController.create)
router.get('/',itemController.getAll)
router.get('/getAllItems', itemController.getAllPagination)
router.get('/getAllSort', itemController.getAllSort)
router.get('/getAllSearch', itemController.search)
router.get('/:_id',itemController.getOne)
router.put('/:_id', itemController.update)
router.delete('/:_id', itemController.delete)

module.exports=router