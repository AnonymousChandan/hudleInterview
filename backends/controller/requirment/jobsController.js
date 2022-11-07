const jobModel=require("../../schema/job")
const recruiterSchema=require("../../schema/recruiterSchema")
const applicantSchema=require("../../schema/JobApplicant")
const appliedModel=require("../../schema/appliedSchema")
const jwt=require("jsonwebtoken")
const express=require("express")
const router=express.Router()
router.post("/post",(req,res)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
          if (err) {
            res.status(500).json({
              status: "failed",
              message: "Not Authenticated"
            })
          }
         recruiterSchema.find({email:decoded}).then((data)=>{
            if(data.length){
                       jobModel.create({
                        title: req.body.title,
                        date: req.body.date,
                        maxApplicants: req.body.maxApplicants,
                        skillsets: req.body.skillsets,
                        salary: req.body.salary,
                        jobType:req.body.jobType,
                        email:decoded
                     }).then((data)=>{
                        res.status(200).send(`Success ${data} saved successfully`)
                       }).catch((err)=>{
                        res.status(400).send(err)
                       })
                    }
         })
        })
      } else {
        return res.status(500).json({
          status: "failed",
          message: "Invalid token"
        })
      }
   
})
router.get("/post",(req,res)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
          if (err) {
            res.status(500).json({
              status: "failed",
              message: "Not Authenticated"
            })
          }
         jobModel.find({email:decoded}).sort({date:-1}).then((data)=>{
        res.status(201).send(data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
        })
      } else {
        return res.status(500).json({
          status: "failed",
          message: "Invalid token"
        })
      }
   
})
router.get("/posts",(req,res)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
          if (err) {
            res.status(500).json({
              status: "failed",
              message: "Not Authenticated"
            })
          }
        applicantSchema.find({email:decoded}).then((data)=>{
            if(data.length){
                jobModel.find({}).then((data)=>{
                    res.status(200).send(data)
                })
            }
    }).catch((err)=>{
        res.status(200).send(err)
    })
        })
      } else {
        return res.status(500).json({
          status: "failed",
          message: "Invalid token"
        })
      }
   
})
router.delete("/delete",(req,res)=>{
    
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
          if (err) {
            res.status(500).json({
              status: "failed",
              message: "Not Authenticated"
            })
          }
          console.log(req.body)
          jobModel.deleteOne({_id:req.body.source}).then((data)=>{res.status(200).send("Deleted successful")
        console.log(data);})
        }).catch((err)=>{
            res.status(400).send(err)
        })
      } else {
        return res.status(500).json({
          status: "failed",
          message: "Invalid token"
        })
      }
})
router.get('/application', (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            appliedModel.find({ Recruiteremail: decoded }).then((data) => {
                console.log(data)
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
router.put("/update",(req,res)=>{
    if (req.body.headers.authorization) {
        const token = req.body.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            appliedModel.updateOne({_id:req.body.data.source}, { $set: { status: req.body.data.payload }}).then((data)=>{
                console.log(data)
                res.status(200).send(data)
            }).catch((err)=>{
                console.log(err)
            })
        })
    } else {
        return res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }
})
router.get('/applicantData', (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            applicantSchema.find({email:decoded}).then((data) => {
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
module.exports=router