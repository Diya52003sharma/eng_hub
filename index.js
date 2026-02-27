const express = require('express')
var cors = require('cors')
const path = require("path");

const app = express()

const db =require('./config/db')

app.use(express.urlencoded({extended:false}));
app.use(express.json({limit:'50mb'}));
app.use(cors())

// API routes
const adminRoutes=require('./routes/adminRoutes')
app.use('/admin',adminRoutes)

const studentRoutes=require('./routes/studentRoutes')
app.use('/student',studentRoutes)

// React build serve
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let seed= require('./adminlogin/seed')
seed.seedadmin()

app.listen(3000,()=>{
    console.log("Server Start at 3000")
})