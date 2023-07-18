const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend_files/index.html'));
})
router.get("/rooms1",(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend_files/files/1x1.html'));
})
router.get("/rooms2",(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend_files/files/2x2.html'));
})
router.get("/rooms1/:id",(req,res)=>{
    const id = req.params['id'];
    // res.redirect('/sensor-readings/:id')
    res.sendFile(path.join(__dirname,'../frontend_files/files/1.html'));
})
router.get("room1/worker",(req,res)=>{
    // const headers = {
    //     'Content-type': 'application/javascript',
    //   };
      res.setHeader('content-type', 'text/javascript');
    res.sendFile(path.join(__dirname,'../frontend_files/worker.js'));
})
module.exports = router;