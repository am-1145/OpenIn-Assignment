const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
    parenttask_id: {
        type: String,
    },
    task_id:{
        type:String,
        required:true
    },
    status: {
        type: Number,
        enum: [0, 1], // 0: incomplete, 1: complete
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
