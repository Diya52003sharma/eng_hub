const paper = require('./oldpaperModel')

exports.addpaper = (req, res) => {
    // console.log(req.body)
    if (req == undefined || req.body == undefined || req.body.title == undefined || req.body.description == undefined) {
        res.json({
            "Message": "Please fill paper Name",
            "Status": 400,
            "Success": false
        })

    } else {
        var paperobj = new paper();
        paperobj.course_id = req.body.course_id
        paperobj.batch_id = req.body.batch_id
        paperobj.title = req.body.title
        paperobj.description = req.body.description
        paperobj.teacher_id = req.body.teacher_id
        if (req.file != undefined) {
            paperobj.upload_file = "pdf/" + req.file.filename
        }

        paperobj.marks = req.body.marks
        paperobj.due_date = req.body.due_date
        paperobj.save()
        res.json({
            "Message": "paper Added",
            "Status": 200,
            "Success": true,
            "paper": paperobj
        })
    }
}

exports.showpaper = (req, res) => {
    req.body.status = true
    paper.find(req.body)
        //.populate("batch_id")
        .populate("course_id")
        .exec(function (err, data) {
            if (err) {
                res.json({
                    "Message": "Error in API",
                    "Status": 500,
                    "Success": false,
                    "Error": String(err)
                })
            }
            else {
                res.json({
                    "Message": "All paper",
                    "Status": 200,
                    "Success": true,
                    "paper": data
                })
            }
        })


}
exports.managepaper = (req, res) => {
    // console.log(req.body)
    paper.findOne({ "_id": req.body._id }).populate('course_id').populate('batch_id').exec(function (err, data) {
        res.json({
            "Message": "Single paper",
            "Status": 200,
            "Success": true,
            "paper": data
        })
    })
}

exports.updatepaper = (req, res) => {
    console.log(req.body)
    paper.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No paper Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.course_id = req.body.course_id
                data.batch_id = req.body.batch_id
                data.title = req.body.title
                data.description = req.body.description
                data.teacher_id=req.body.teacher_id
                if (!!req.file)
                    data.upload_file = "pdf/" + req.file.filename
                data.due_date = req.body.due_date
                data.updatedAt = Date.now()
                data.save()
                    .then(update => {
                        res.json(
                            {
                                "message": "paper Updated Successfully.",
                                "status": 200,
                                "success": true,
                                "paper": data
                            }
                        )
                    }
                    )
                    .catch(err => {
                        res.json(
                            {
                                "message": "Error In Materail Updation!",
                                "status": 404,
                                "success": false,
                                "Error": String(err)
                            }
                        )
                    })
            }
        })
}

exports.deletepaper = (req, res) => {
    paper.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "paper": data
        })
    })
}