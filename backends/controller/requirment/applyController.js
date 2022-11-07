const appliedModel = require("../../schema/appliedSchema")
const jobApplicantModel=require("../../schema/JobApplicant")
const jwt = require('jsonwebtoken')
const express = require("express")
const router = express.Router()
router.post("/applied", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            jobApplicantModel.find({ email: decoded }).then((data) => { 
                if (data.length) {
                    console.log(req.body)
                    appliedModel.create({
                        Recruiteremail: req.body.email,
                        status: "applied",
                        title:req.body.title,
                        email:decoded,
                        skillsets:req.body.skillsets,
                        jobType:req.body.jobType,
                        salary:req.body.salary
                    }).then((data) => {
                        console.log(data)
                        res.status(200).send(data)
                    }).catch((err) => {
                        console.log(err)
                        res.status(400).send(err)
                    })
                }
            }).catch((err) => {
                res.status(401).send(err)
            })
        })
    } else {
        return res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }
})
router.get('/applied', (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            appliedModel.find({ email: decoded }).then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(400).send(err)
            })
        })
    } else {
        return res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }

})
module.exports = router
