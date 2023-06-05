const mongoose = require("mongoose") 

const formSchema = mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    eventDetails:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    dates:{
        type: Array,
        required:true
    },
    Technician:{
        type:Boolean
    },
    Cleaning:{
        type:Boolean
    },
    Sound:{
        type:Boolean
    }
  });
  const formData = mongoose.model("formSchema", formSchema);

  module.exports = formData;