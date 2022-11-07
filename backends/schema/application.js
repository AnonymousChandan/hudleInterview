const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicantEmail: {
      type: String,
      required: true,
    },
    requireterEmail: {
      type: String,
      required: true,
    },
    jobEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfApplication <= value;
          },
          msg: "dateOfJoining should be greater than dateOfApplication",
        },
      ],
    },
  },
);
const applicantModel=mongoose.model("applications", applicationSchema);
module.exports = applicantModel
