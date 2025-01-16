const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/getAllPagination', userController.getAllPagination)
router.get('/getAllSort', userController.getAllSort)
router.get('/getAllSearch', userController.getAllSearch)
router.get('/getAllFilter', userController.getAllFilter)
router.get('/:id', userController.getById)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router;