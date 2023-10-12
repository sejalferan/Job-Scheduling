const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobileno:{
        type: Number,
        required: true,
    },
    district:{
        type: String,
        required: true
    },
    taluka:{
        type: String,
        required: true
    },
    village:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    surveyno:{
        type: String,
        required: true
    },
    area:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Job',JobSchema);