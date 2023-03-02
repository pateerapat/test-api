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
        const CONSTRUCTOR_TYPE = {
            "String":   String,
            "Number":   Number,
            "Boolean":  Boolean,
            "Object":   Object,
            "Array":    Array,
        }
        let selectedType = CONSTRUCTOR_TYPE[type]
        return {
            type: selectedType,
            required: isRequired,
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
