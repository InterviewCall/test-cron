const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
    candidateName: {
        type: String,
        required: true
    },

    candidateEmail: { 
        type: String, 
        required: true,
        unique: true
    },

    dateOfTest: {
        type: Date,
        required: true,
        index: true
    },

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true,
        index: true
    },

    invitedBy: {
        type: String,
        required: true
    },

    testStatus: {
        type: String,
        enum: ['Invited', 'In-Progress', 'Submitted', 'Expired'],
        default: 'Invited',
        required: true,
        index: true
    },

    reportCard: {
        type: String,
        default: null
    },

    percentage: {
        type: Number,
        default: null
    },

    ratings: {
        type: Number,
        default: null
    }
}, { timestamps: true });

scheduleSchema.index({ dateOfTest: 1, endTime: 1, testStatus: 1 });

const ScheduleModel = model('ScheduleModel', scheduleSchema);

module.exports = ScheduleModel;