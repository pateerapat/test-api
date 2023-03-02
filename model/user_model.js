const bcrypt = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const {
    validateEmail,
    validatePassword,
} = require("../functions/functions")
const {
    insertUserQuery,
    getUserQueryById,
    getUserFilterByQuery,
    getAllUserQuery,
    deleteUserQueryById,
    updateUserQueryById,
} = require('../core/user_query')
const { successValidator } = require('../functions/functions')


function checkNonQueryRegister(data) {
    let response = null
    const isValidEmail = validateEmail(data.email)
    if (!isValidEmail) {
        response = {
            success: false,
            payload: [],
            msg: 'Email is not valid.',
        }
    }
    const isValidPassword = validatePassword(data.password)
    if (!isValidPassword) {
        response = {
            success: false,
            payload: [],
            msg: 'Password is too short. (8 is the minimum length)',
        }
    }
    return [response, isValidEmail && isValidPassword]
}


async function checkQueryRegister(data) {
    try {
        let response = await getUserFilterByQuery({
            email: data.email,
        })
        if (response.payload.data.length > 0) {
            response.msg = 'Duplicated Email detected.'
            response.success = false
        }
        return [response, response.success]
    } catch (err) {
        console.log(err)
    }
}


async function checkLogin(data) {
    try {
        let response = await getUserFilterByQuery({
            email: data.email,
        })
        if (response.payload.data.length <= 0) {
            response.msg = 'Your email is not registered.'
            response.success = false
            return [response, response.success]
        }
        const user = response.payload.data[0]
        const match = await bcrypt.compare(data.password, user.password)
        if (match) {
            response.payload.token = sign({ result: response.payload.data[0] }, process.env.SECRET, {
                expiresIn: "1h",
            })
        } else {
            response.msg = 'Password mismatch.'
            response.success = false
        }
        return [response, response.success]
    } catch (err) {
        console.log(err)
    }
}


async function register(data) {
    try {
        const [responseNonQuery, isValidNonQuery] = checkNonQueryRegister(data)
        if (!isValidNonQuery) {
            return responseNonQuery
        }
        const [responseQuery, isValidQuery] = await checkQueryRegister(data)
        if (!isValidQuery) {
            return responseQuery
        }
        data.owned_activity = []
        const encryptedPwd = await bcrypt.hash(data.password, 10)
        data.password = encryptedPwd
        let response = await insertUserQuery(data)
        if (response.success) {
            response.payload.token = sign({ result: response.payload.data }, process.env.SECRET, {
                expiresIn: "1h",
            })
        }
        return successValidator(
            response,
            'Register successful.',
            'failed to register.',
        )
    } catch (err) {
        console.log(err)
    }
}


async function isLoginOrRegisterAuth(data) {
    try {
        let response = await getUserFilterByQuery({
            email: data.email,
        })
        if (response.payload.data.length <= 0) {
            return [null, false]
        }
        const user = response.payload.data[0]
        if (!user.google_id) {
            let response = await updateUserQueryById(
                user.id,
                {
                    google_id: data.google_id,
                }
            )
            return [response.payload.new_data[0], response.success]
        }
        return [user, response.success]
    } catch (err) {
        console.log(err)
    }
}


async function googleAuth(data) {
    try {
        const [responseLogin, isLogin] = await isLoginOrRegisterAuth(data)
        if (isLogin) {
            return {
                success: true,
                payload: [responseLogin],
                msg: 'Login successful',
            }
        }
        data.owned_activity = []
        const encryptedPwd = await bcrypt.hash(data.password, 10)
        data.password = encryptedPwd
        let response = await insertUserQuery(data)
        return successValidator(
            response,
            'Register successful.',
            'failed to register.',
        )
    } catch (err) {
        console.log(err)
    }
}


async function login(data) {
    try {
        const [response, isValid] = await checkLogin(data)
        if (isValid) {
            response.msg = 'Login successful'
        }
        return response
    } catch (err) {
        console.log(err)
    }
}


async function getAllUser(id) {
    try {
        let response = await getAllUserQuery(id)
        return successValidator(
            response,
            'Get all data successful.',
            'Failed to get all data.',
        )
    } catch (err) {
        console.log(err)
    }
}


async function getUserById(id) {
    try {
        let response = await getUserQueryById(id)
        return successValidator(
            response,
            'Get data successful.',
            'Failed to get data.',
        )
    } catch (err) {
        console.log(err)
    }
}


async function updateUserOwnedActivityById(id, activity) {
    try {
        let responseGet = await getUserQueryById(id)
        const userOwnedActivity = responseGet.payload.data[0].owned_activity
        userOwnedActivity.push(activity)
        let responseUpdate = await updateUserQueryById(
            id,
            {
                owned_activity: userOwnedActivity,
            }
        )
        return successValidator(
            responseUpdate,
            'Get data successful.',
            'Failed to get data.',
        )
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    register,
    googleAuth,
    getAllUser,
    login,
    getUserById,
    updateUserOwnedActivityById,
}
