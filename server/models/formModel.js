const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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
});

const form = mongoose.model("forms", formSchema);

module.exports = form;
