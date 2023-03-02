const {
    login,
    register,
    googleAuth,
    getAllUser,
    getUserById,
} = require("../model/user_model")


module.exports = {
    registerController: async (req, res, next) => {
        try {
            const jsonResponse = await register(req.body)
            res.status(200)
            res.json(jsonResponse)
        } catch (err) {
            next(err)
        }
    },
    googleAuthController: async (req, res, next) => {
        try {
            const jsonResponse = await googleAuth(req.body)
            res.status(200)
            res.json(jsonResponse)
        } catch (err) {
            next(err)
        }
    },
    getAllUserController: async (req, res, next) => {
        try {
            const jsonResponse = await getAllUser(req.body)
            res.status(200)
            res.json(jsonResponse)
        } catch (err) {
            next(err)
        }
    },
    loginController: async (req, res, next) => {
        try {
            const jsonResponse = await login(req.body)
            res.status(200)
            res.json(jsonResponse)
        } catch (err) {
            next(err)
        }
    },
    getUserByIdController: async (req, res, next) => {
        try {
            const jsonResponse = await getUserById(req.params.id)
            res.status(200)
            res.json(jsonResponse)
        } catch (err) {
            next(err)
        }
    },
}
