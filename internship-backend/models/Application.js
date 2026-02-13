const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Applied"
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Application", ApplicationSchema);
