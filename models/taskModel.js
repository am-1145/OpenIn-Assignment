const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
       priority: {
        type: Number,
        validate: {
            validator: function(value) {
                return value >= 0 && value <= 3; // Ensure priority value is between 0 and 3
            },
            message: 'Priority must be between 0 and 3'
        }
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

taskSchema.virtual('calculated_priority').get(function() {
    const today = new Date();
    const dueDate = new Date(this.due_date);

    // Calculate the difference in days between today and the due date
    const differenceInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    // Determine priority based on the difference in days
    if (differenceInDays === 0) {
        return 0;
    } else if (differenceInDays === 1 || differenceInDays === 2) {
        return 1;
    } else if (differenceInDays >= 3 && differenceInDays <= 4) {
        return 2;
    } else {
        return 3;
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
