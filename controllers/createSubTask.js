const SubTask = require('../models/subTaskModel');
const Task = require('../models/taskModel');

// POST endpoint to create a subtask
const subtask= async (req, res) => {
    const { parenttask_id,task_id } = req.body;
    try {
        // Check if the parent task exists
        const taskExists = await Task.findById(parenttask_id);
        if (!taskExists) {
            return res.status(404).json({ message: "Parent task not found" });
        }

        // Create a new subtask document
        const subtask = new SubTask({
            task_id,
            status: 0, // Set status to incomplete by default
            created_at: new Date(),
            updated_at: new Date()
        });

        // Save the subtask to the database
        await subtask.save();

        res.status(201).json({ message: "Subtask created successfully", subtask });
    } catch (error) {
        console.error("Error creating subtask:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = subtask;
