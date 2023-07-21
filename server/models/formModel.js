const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");

const dater = () => {
  let d = Date();
  let a = d.toString();
  return a;
};

const formSchema = new mongoose.Schema({
  formID: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(),
  },
  status:{
    type:String,
    default:"Submitted",
  },
  resourceName: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
  approvedTime: {
    type: String,
    default: dater,
    select: false,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: [validator.isEmail, "Please provide a valid email"],
  // },
  phoneNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (num) {
        // Convert the number to a string and check its length
        const phoneNumberString = num.toString();
        return phoneNumberString.length >= 10;
      },
      message: "Phone number must be at least 10 digits long",
    },
  },
  studentCoordinator: {
    type: String,
  },
  RegistrationNo: {
    type: Number,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
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
  },
  isSubmitted: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const form = mongoose.model("forms", formSchema);

module.exports = form;
