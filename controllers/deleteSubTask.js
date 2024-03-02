// Delete task API
const SubTask = require('../models/subTaskModel');

const deleteSubTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find the Subtask by ID and delete it
        const deletedSubTask = await SubTask.findByIdAndDelete(taskId);

        // Check if the task exists
        if (!deletedSubTask) {
            return res.status(404).json({ message: "Sub Task not found" });
        }

        // Send the deleted task as response
        res.json({ message: "Sub Task deleted successfully", task: deletedSubTask });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteSubTask;
