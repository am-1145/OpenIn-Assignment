const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const dotenv=require('dotenv')
const db=require('./config/db')
const cookieParser=require('cookie-parser')
const cronjob=require('./controllers/cronPriority')
const voice=require('./controllers/makecall')
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 3000; // You can change the port as needed
app.use(bodyParser.json());
dotenv.config();
db();


// User Routes
app.use("/api/user",require('./Routes/user.route'))
app.use("/api/auth",require("./Routes/auth.route"))

cronjob();
voice();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});