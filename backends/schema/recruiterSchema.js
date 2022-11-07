const mongoose=require("mongoose")
const recruiterSchema=new mongoose.Schema({

      name: {
        type: String,
        required: true,
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      phone: {
        type: String,
        uniquie:true,
        required:true
      },
      bio: {
        type: String,
      },
})
const recruiterModel=mongoose.model("recruiter",recruiterSchema)
module.exports=recruiterModel