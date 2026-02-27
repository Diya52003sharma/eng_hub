const user = require('../user/userModel')
const Teacher = require('../admin/teacher/teacherModel')
const Student = require('../admin/student/studentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.login = (req, res) => {

    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "please fill all values",
            "status": 400,
            "success": false
        })
    }

    else {
        user.findOne({ "email": req.body.email })

            .then(async userobj => {
                if (userobj == null) {
                    res.json({
                        "message": "no user exist",
                        "status": 400,
                        "success": true
                    })
                }

                else {

                    if (bcrypt.compareSync(req.body.password, userobj.password)) {
                        let validate = false
                        if (userobj.userType == 3) {
                            let teacherObj = await Teacher.findOne({ _id: userobj.teacherId })
                            if (teacherObj != null && teacherObj.status) validate = true
                        }
                        else if (userobj.userType == 2) {
                            let studentObj = await Student.findOne({ _id: userobj.studentId })
                            if (studentObj != null && studentObj.status) validate = true
                        }
                        else if (userobj.userType == 1) {
                            validate = true
                        }
                        if (validate) {
                            let payload = { _id: userobj._id, FirstName: userobj.FirstName, phone: userobj.phone }
                            let token = jwt.sign(payload, "SECRET")
                            res.json({
                                "message": "user successfully logined in",
                                "status": 200,
                                "success": true,
                                token: token,
                                data: userobj
                            })
                        } else {
                            res.json({
                                "message": "No user exist",
                                "status": 400,
                                "success": false
                            })
                        }
                    }

                    else {
                        res.json({
                            "message": "invalid email or password",
                            "status": 400,
                            "success": false
                        })
                    }
                }
            })

            .catch(err => {
                // console.log(err);
                res.json({
                    "message": "error in email",
                    "status": 500,
                    "success": false,
                    "err": String(err)
                })
            })
    }
}
exports.alluser = (req, res) => {
    user.find()
        .select("name email userType studentId")
        .populate('studentId', "phone college quali hobbies")
        .then(data => {
            if (data == null) {
                res.json({
                    "message": "no user exist",
                    "status": 200,
                    "success": true
                })
            } else {
                res.json({

                    "message": "all user page",
                    "status": 200,
                    "success": true,
                    "user": data
                })
            }
        })
        .catch(err => {
            // console.log(err)
            res.json({
                "message": "error in all user page",
                "status": 500,
                "success": false,
                "error": String(err)

            })
        })
}


exports.loginstudent = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "please fill all values",
            "status": 400,
            "success": false
        })
    }

    else {
        user.findOne({ "email": req.body.email })
            .then(userobj => {
                if (userobj == null) {
                    res.json({
                        "message": "no user exist",
                        "status": 400,
                        "success": true
                    })
                }

                else {
                    if (bcrypt.compareSync(req.body.password, userobj.password)) {
                        res.json({
                            "message": "user successfully logined in",
                            "status": 200,
                            "success": true
                        })
                    }

                    else {
                        res.json({
                            "message": "invalid email or password",
                            "status": 400,
                            "success": false
                        })
                    }
                }
            })

            .catch(err => {
                // console.log(err);
                res.json({

                    "message": "error in email",
                    "status": 500,
                    "success": false,
                    "err": string(err)
                })
            })
    }
}
exports.studentlogin = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "fill values",
            "status": 200,
            "success": false
        })
    }

    else {
        user.findOne({ 'email': req.body.email })
            .then(userObj => {
                if (userObj == null) {
                    res.json({
                        "message": "No User Exist",
                        "status": 400,
                        "success": true
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, userObj.password)) {
                        let useInfo = {
                            name: userObj.name,
                            email: userObj.email,
                            _id: userObj._id,

                        }


                        res.json({
                            "message": "User Successfully Loged in",
                            "status": 200,
                            "success": true,

                        })
                    }
                    else {
                        res.json({
                            "message": "Invalid Email and Password",
                            "status": 400,
                            "success": false
                        })
                    }
                }
            }).catch(err => {
                // console.log(err)
                res.json({
                    "message": "Error in Email",
                    "status": 500,
                    "success": false,
                    "err": String(err)
                })
            })

    }

}

