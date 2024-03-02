const Task=require('../models/taskModel')


const createTask= async (req, res) => {
    const { title, description, due_date ,user_id} = req.body;
    //  const user_id = req.user._id
    if (!title || !description || !due_date) {
        return res.status(400).json({ message: "Title, description, and due_date are required" });
    }

    try {
        // Create a new task document
        const task = new Task({
            title,
            description,
            due_date,
            status: "TODO",
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        });

        // Save the task to the database
        await task.save();

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports=createTask;