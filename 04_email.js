const express = require('express');
const emailRoute = express.Router();

emailRoute.get('/',(req,res)=>{
    res.send('email')
})
emailRoute.get('/data',(req,res)=>{
    res.send('email data')
})
module.exports = emailRoute;