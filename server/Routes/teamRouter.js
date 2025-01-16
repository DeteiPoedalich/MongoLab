const Router = require('express')
const router = new Router()
const teamController=require("../controllers/teamController")

router.post('/',teamController.create)
router.get('/',teamController.getAll)
router.get('/getAllTeam', teamController.getAllPagination)
router.get('/getAllSort', teamController.getAllSort)
router.get('/getAllSearch', teamController.search)
router.get('/:_id',teamController.getOne)

router.put('/:_id', teamController.update)
router.delete('/:_id', teamController.delete)

module.exports=router