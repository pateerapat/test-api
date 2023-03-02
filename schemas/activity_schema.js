const mongoose = require('mongoose')
const { getMongooseType } = require('../functions/functions')


const activitySchema = mongoose.Schema({
    district:               getMongooseType('String', true),
    activity_type:          getMongooseType('Array', true),
    is_use_to_activity:     getMongooseType('Boolean', true),
    activity_name:          getMongooseType('String', true),
    activity_detail:        getMongooseType('String', true),
    activity_time:          getMongooseType('Number', true),
    address:                getMongooseType('String', true),
    address_detail:         getMongooseType('String', false),
    latitude:               getMongooseType('Number', true),
    longtitude:             getMongooseType('Number', true),
    facility_food:          getMongooseType('Array', false),
    facility_travel:        getMongooseType('Array', false),
    facility_other:         getMongooseType('Array', false),
    activity_image:         getMongooseType('Array', true),
    participation_limit:    getMongooseType('Number', true),
    activity_price:         getMongooseType('Number', true),
    status:                 getMongooseType('String', true),
},
{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated_at',
    },
})


module.exports = mongoose.model('activities', activitySchema)
