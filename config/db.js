const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdiya0523_db_user:512@cluster0.owskwmx.mongodb.net/?appName=Cluster0")
    .then(connect => {
        console.log("DB Connected")
    })
    .catch(err => {
        console.log("Error in DB Connected", err)
    })