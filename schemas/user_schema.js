
const mongoose = require('mongoose')
const { getMongooseType } = require('../functions/functions')


const userSchema = mongoose.Schema({
    first_name:         getMongooseType('String', true),
    last_name:          getMongooseType('String', true),
    email:              getMongooseType('String', true),
    password:           getMongooseType('String', true),
    phone:              getMongooseType('String', true),
    owned_activity:     getMongooseType('Array', true),
    google_id:          getMongooseType('String'),
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated_at',
    },
})


module.exports = mongoose.model('users', userSchema)
