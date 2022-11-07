const mongoose=require("mongoose")
const appliedSchema=new mongoose.Schema({
    Recruiteremail:{
        type:String
    },
    title:{
        type:String
    },
    email: {
        type:String
    },
    skillsets: [String],
    jobType: {
        type:String
    },
    salary: {
        type:String
    },
    status:{
        type:String
    }
})
const appliedModel=mongoose.model('applied',appliedSchema)
module.exports=appliedModel