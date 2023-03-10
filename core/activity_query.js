const connect = require('./connect')


const Schema = require('../schemas/activity_schema')


module.exports = {
    insertActivityQuery: async (data) => {
        return connect().then(async (mongoose) => {
            let response = {
                success: false,
                payload: {},
            }
            try {
                const dataResult = await new Schema(data).save()
                response.payload.data = dataResult
                response.success = true
            } catch (err) {
                response.success = false
            } finally {
                mongoose.connection.close()
                return response
            }
        })
    },
    getActivityQueryById: async (id) => {
        return connect().then(async (mongoose) => {
            let response = {
                success: false,
                payload: {},
            }
            try {
                let dataResult = await Schema.findOne(
                    {_id: id},
                    '-__v',
                )
                response.payload.data = [dataResult]
                response.success = true
            } catch (err) {
                response.success = false
            } finally {
                mongoose.connection.close()
                return response
            }
        })
    },
    getAllActivityQuery: async () => {
        return connect().then(async (mongoose) => {
            let response = {
                success: false,
                payload: {},
            }
            try {
                let dataResult = await Schema.find(
                    {},
                    '-__v',
                )
                response.payload.data = dataResult
                response.success = true
            } catch (err) {
                response.success = false
            } finally {
                mongoose.connection.close()
                return response
            }
        })
    },
    deleteActivityQueryById: async (id) => {
        return connect().then(async (mongoose) => {
            let response = {
                success: false,
                payload: {},
            }
            try {
                let dataResult = await Schema.deleteOne({_id: id})
                response.payload.data = dataResult
                response.success = true
            } catch (err) {
                response.success = false
            } finally {
                mongoose.connection.close()
                return response
            }
        })
    },
    updateActivityQueryById: async (id, data) => {
        return connect().then(async (mongoose) => {
            let response = {
                success: false,
                payload: {},
            }
            try {
                let dataResult = await Schema.findOneAndUpdate({_id: id}, data)
                let findResult = await Schema.findOne(
                    {_id: id},
                    '-__v',
                )
                response.payload.old_data = [dataResult]
                response.payload.new_data = [findResult]
                response.success = true
            } catch (err) {
                response.success = false
            } finally {
                mongoose.connection.close()
                return response
            }
        })
    },
}
