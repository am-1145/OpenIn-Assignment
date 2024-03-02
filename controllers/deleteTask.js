// Delete task API
const Task = require('../models/taskModel');

const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Check if the task exists
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Send the deleted task as response
        res.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteTask;
