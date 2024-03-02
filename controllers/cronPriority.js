const cron = require('node-cron');
const Task = require('../models/taskModel');

// Cron job for changing task priority based on due date

const updateTaskPriorities = () => {
cron.schedule('* * * * *', async () => {
    try {
        // Define the current date
        const currentDate = new Date();

        // Find tasks with due dates equal to today and update their priority
        await Task.updateMany(
            { due_date: { $eq: currentDate }, status: { $ne: 'DONE' } },
            { priority: 0 }
        );

        // Find tasks with due dates between tomorrow and the day after tomorrow and update their priority
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        const dayAfterTomorrow = new Date(currentDate);
        dayAfterTomorrow.setDate(currentDate.getDate() + 2);

        await Task.updateMany(
            { due_date: { $gte: tomorrow, $lte: dayAfterTomorrow }, status: { $ne: 'DONE' } },
            { priority: 1 }
        );

        // Find tasks with due dates more than two days from now and update their priority
        await Task.updateMany(
            { due_date: { $gt: dayAfterTomorrow }, status: { $ne: 'DONE' } },
            { priority: 2 }
        );

        console.log("Task priorities updated successfully");
    } catch (error) {
        console.error("Error updating task priorities:", error);
   
    }
});
}

module.exports=updateTaskPriorities