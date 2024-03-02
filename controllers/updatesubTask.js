const subModel=require('../models/subTaskModel')

// Update subtask API
const updateSubTask=async (req, res) => {
    const subtaskId = req.params.id;
    const { status } = req.body;

    // Check if the provided subtask ID is valid
  const subtask = await subModel.findByIdAndUpdate(subtaskId);
        
        if (!subtask) {
            return res.status(404).json({ message: "Sub Task not found" });
        }

    // Update subtask status
    if (status !== undefined) {
        subtask.status = status;
    }
    subtask.save();
    // Update the subtask in the database or storage
    // This is where you would typically update the subtask in your database

    res.json({ message: "Subtask updated successfully", subtask: subtask });
    
};
module.exports=updateSubTask
