// Update task API

const tasks=require('../models/taskModel')
const updateTask= async(req, res) => {
    const taskId = req.params.id;
    const { due_date, status } = req.body;

    // Check if the provided task ID is valid
const task = await tasks.findByIdAndUpdate(taskId);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

    // Update task details
    if (due_date) {
        task.due_date = due_date;
    }
    if (status) {
        task.status = status;
    }

   
    await task.save();
    res.json({ message: "Task updated successfully", task: task });
};

module.exports=updateTask
