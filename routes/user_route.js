const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const verifyToken = require("../validation/verifyToken")
const apiValidation = require('../validation/apiValidation')


const {
    registerController,
    getAllUserController,
    loginController,
    getUserByIdController,
    googleAuthController,
} = require('../controller/user_controller')


router.post('/register',[
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('phone').notEmpty(),
], apiValidation, registerController)


router.post('/google_auth', [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('phone').notEmpty(),
    body('google_id').notEmpty(),
], apiValidation, googleAuthController)


router.post('/login', [
    body('email').notEmpty(),
    body('password').notEmpty(),
], apiValidation, loginController)


router.get('/get/all', getAllUserController)


router.get('/get_by_id/:id', [
    param('id').notEmpty(),
    ], apiValidation, verifyToken, getUserByIdController,
)


module.exports = router
