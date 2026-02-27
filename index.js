const express = require('express');
var cors = require('cors');

const app = express();
const db = require('./config/db');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());

// routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/student', studentRoutes);

// seed admin
let seed = require('./adminlogin/seed');
seed.seedadmin();


// ✅ health check route (IMPORTANT)
app.get("/", (req, res) => {
    res.send("EnggHub API running successfully 🚀");
});


// ✅ proper port handling (Docker + EC2 compatible)
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server Start at ${PORT}`);
});