module.exports = {
    validateEmail: (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true
        }
        return false
    },
    validatePassword: (password) => {
        if (password.length >= 8) {
            return true
        }
        return false
    },
    validateUser: (user) => {
        if (user.length >= 4) {
            return true
        }
        return false
    },
    getMongooseType: (type, isRequired = false) => {
        if (type == 'String') {
            return {
                type: String,
                required: isRequired,
            }
        } else if (type == 'Number') {
            return {
                type: Number,
                required: isRequired,
            }
        } else if (type == 'Array') {
            return {
                type: Array,
                required: isRequired,
            }
        } else if (type == 'Boolean') {
            return {
                type: Boolean,
                required: isRequired,
            }
        } else {
            return {
                type: String,
                required: isRequired,
            }
        }
    },
    successValidator: (response, successMessage = '', failMessage = '') => {
        if (response.success) {
            return {
                ...response,
                msg: successMessage,
            }
        } else {
            return {
                ...response,
                msg: failMessage,
            }
        }
    },
}
