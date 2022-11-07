const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")
const jobSeekerController=require("./controller/user/jobSeeker")
const recruiterController=require("./controller/user/recruiter")
const jobController=require("./controller/requirment/jobsController")
const appliedController=require('./controller/requirment/applyController')
const dotenv=require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors())
app.use(express.static('profile'));
app.use("/applicant",jobSeekerController)
app.use("/recruiter",recruiterController)
app.use("/job",jobController)
app.use("/",appliedController)
mongoose.connect(process.env.DATABASE,(err)=>{
    if(!err){
        console.log("Database Connected");
    }else{
        console.log(err);
    }
})
app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`Port Connected on ${process.env.PORT}`);
    }else{
        console.log(err);
    }
})