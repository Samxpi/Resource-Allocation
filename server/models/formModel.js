const mongoose = require("mongoose") ;
const dater =() =>{
    let d = Date();
    let a = d.toString();
    return a;
}

const formSchema = new mongoose.Schema({
    resourceName:{
        type:String,
        required:true
    },
    eventName:{
        type: String,
        required: true,
    },
    eventDetails:{
        type: String,
        required: true,
    },
    approvedTime:{
        type: String,
        default: dater,
        select: false,
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