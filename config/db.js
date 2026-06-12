const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/quick_space")
    .then(connect => {
        console.log("DB Connected")
    })
    .catch(err => {
        console.log("Error in DB Connected", err)
    })