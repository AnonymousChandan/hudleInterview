const mongoose=require("mongoose")
const JobApplicantSchema=new mongoose.Schema({
      name: {
        type: String,
        // required: true,
      },
      email:{
        type:String,
        // // required:true,
        // unique:true
      },
      phone:{
        type:String,
        // required:true,
        // unique:true
      },
      password:{
        type:[],
        required:true,
      },
     
      skills: [String],
      resume: {
        type: Buffer,
      },
      profile: {
        type: Buffer,
      },
    },
    { collation: { locale: "en" }
})
const JobApplicantModel=mongoose.model("JobApplicant",JobApplicantSchema)
module.exports=JobApplicantModel