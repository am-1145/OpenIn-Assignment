const express = require('express');
const router = express.Router();
const Subtask = require('../models/subTaskModel');

// GET endpoint to fetch all subtasks of a task
const subTask=async (req, res) => {
    try {
        const taskId = req.body;

        // Fetch all subtasks associated with the specified taskId
        const subtasks = await Subtask.find({ task_id: taskId }).exec();

        res.status(200).json({ subtasks });
    } catch (error) {
        console.error("Error fetching subtasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = subTask;
