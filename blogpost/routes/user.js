const userController = require('../controllers/user')
const express = require('express');
const { upload } = require('../controllers/cloudinaryConfig');
const router = express.Router();
router.post('/signup',upload.single('image'),userController.signup);
router.post('/login',userController.login)
module.exports = router;