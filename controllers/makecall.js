const cron = require('node-cron');
const twilio = require('twilio');
const Task = require('../models/taskModel'); 
const User = require('../models/userModel'); 

// Initialize Twilio client with your Twilio Account SID and Auth Token
const accountSid = '';
const authToken = '';
const twilioClient = twilio(accountSid, authToken);

// Function to make voice call using Twilio
const makeVoiceCall = async (to) => {
    try {
        // Make a voice call using Twilio
        const call = await twilioClient.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml', // TwiML URL for the voice call
            to,
            from: '', // Twilio phone number
        });

        console.log("Voice call initiated:", call.sid);
        return true; // Call successful
    } catch (error) {
        console.error("Error making voice call:", error);
        return false; // Call failed
    }
};

// Cron job for voice calling using Twilio
cron.schedule('* * * * *', async () => {
    try {
        // Fetch overdue tasks from the database
        const overdueTasks = await Task.find({ due_date: { $lt: new Date() }, status: "TODO" }).populate('user_id');

        // Group tasks by user and sort by priority
        const tasksByUser = {};
        overdueTasks.forEach(task => {
            const { user_id, priority } = task;
            if (!tasksByUser[user_id]) {
                tasksByUser[user_id] = [];
            }
            tasksByUser[user_id].push({ task, priority });
        });

        // Iterate through groups of tasks, starting with highest priority
        for (const userId of Object.keys(tasksByUser)) {
            const tasks = tasksByUser[userId].sort((a, b) => a.priority - b.priority);
            for (const { task } of tasks) {
                // Attempt to make voice call to user's phone number
                const user = await User.findById(userId);
                if (user) {
                    const callSuccessful = await makeVoiceCall(user.phone_number);
                    if (callSuccessful) {
                        break; // Move to next group if call is successful
                    }
                }
            }
        }

        console.log("Voice calls scheduled successfully");
    } catch (error) {
        console.error("Error scheduling voice calls:", error);
    }
});

module.exports=makeVoiceCall