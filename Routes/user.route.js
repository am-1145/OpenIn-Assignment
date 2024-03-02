const express=require('express');
const createTask = require('../controllers/createTask');
const verifyToken = require('../utils/verifyUser');
const subtask = require('../controllers/createSubTask');
const gettasks = require('../controllers/getTasks');
const subTask = require('../controllers/getSubTask');
const updateTask = require('../controllers/updateTask');
const updateSubTask = require('../controllers/updatesubTask');
const deleteTask = require('../controllers/deleteTask');
const deleteSubTask = require('../controllers/deleteSubTask');



const userRouter=express.Router();


// Create a new task
userRouter.post('/tasks',verifyToken,createTask);
userRouter.post('/subtasks',verifyToken,subtask);
userRouter.get('/getTask',verifyToken,gettasks)
userRouter.get('/getSubTask',verifyToken,subTask)
userRouter.put('/updateTask/:id',verifyToken,updateTask)
userRouter.put('/updateSubTask/:id',verifyToken,updateSubTask)
userRouter.delete('/deleteTask/:id',verifyToken,deleteTask)
userRouter.delete('/deleteSubTask/:id',verifyToken,deleteSubTask)

module.exports=userRouter;