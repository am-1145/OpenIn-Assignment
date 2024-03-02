const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// GET endpoint to fetch all user tasks with filtering and pagination
const gettasks= async (req, res) => {
    const { user_id } = req.body; // Assuming user ID is extracted from JWT payload
    const { priority, due_date, page, limit } = req.query;

    // Define filter criteria based on query parameters
    const filter = { user_id };
    if (priority) filter.priority = priority;
    if (due_date) filter.due_date = due_date;

    try {
        // Fetch tasks matching the filter criteria with pagination
        const tasks = await Task.find(filter)
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .exec();

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = gettasks;
