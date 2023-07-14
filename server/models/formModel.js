const mongoose = require("mongoose") 

const formSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required: true,
    },
    eventDetails:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    Technician: {
        type: Boolean,
    },
    Cleaning: {
        type: Boolean,
    },
    Sound: {
        type: Boolean,
    }
  });
  
  const form = mongoose.model("forms", formSchema);

  module.exports = form;