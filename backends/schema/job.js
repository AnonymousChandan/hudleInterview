const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email:{
      type:String
    },
    date:{
      type:String
    },
    skillsets: [String],
    jobType: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
  },
);
const jobModel= mongoose.model("jobs", jobSchema);
module.exports =jobModel
