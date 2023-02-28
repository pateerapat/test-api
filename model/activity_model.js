const {
    insertActivityQuery,
    getActivityQueryById,
    getAllActivityQuery,
    deleteActivityQueryById,
    updateActivityQueryById,
} = require('../core/activity_query')
const { successValidator } = require('../functions/functions')

module.exports = {
    insertActivity: async (data) => {
        try {
            let response = await insertActivityQuery(data)
            return successValidator(
                response,
                'Insert successful.',
                'Insert failed.',
            )
        } catch (err) {
            console.log(err)
        }
    },
    getActivityById: async (id) => {
        try {
            let response = await getActivityQueryById(id)
            return successValidator(
                response,
                'Get data successful.',
                'Failed to get data.',
            )
        } catch (err) {
            console.log(err)
        }
    },
    getAllActivity: async (id) => {
        try {
            let response = await getAllActivityQuery(id)
            return successValidator(
                response,
                'Get all data successful.',
                'Failed to get all data.',
            )
        } catch (err) {
            console.log(err)
        }
    },
    deleteActivityById: async (id) => {
        try {
            let response = await deleteActivityQueryById(id)
            return successValidator(
                response,
                'data delete successful.',
                'Failed to delete data.',
            )
        } catch (err) {
            console.log(err)
        }
    },
    updateActivityById: async (id, data) => {
        try {
            let response = await updateActivityQueryById(id, data)
            return successValidator(
                response,
                'update successful.',
                'Update failed.',
            )
        } catch (err) {
            console.log(err)
        }
    },
    updateStatusActivityById: async (id, data) => {
        try {
            if (!['pending', 'complete', 'cancel'].includes(data.status)) {
                return {
                    success: false,
                    payload: {
                        data: [],
                    },
                    msg: 'Invalid status keyed.',
                }
            }
            let response = await updateActivityQueryById(id, data)
            return successValidator(
                response,
                'update successful.',
                'Update failed.',
            )
        } catch (err) {
            console.log(err)
        }
    },
}
