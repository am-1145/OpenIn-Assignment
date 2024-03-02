const express=require('express')

const router=express.Router();


router.post("/signup",require('../controllers/auth.controller'))
router.post("/signin",require('../controllers/sign_in'))

module.exports=router;