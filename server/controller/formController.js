const form = require("./../models/formModel");

const sendEmail = require("./../utilities/email")

exports.forms = async (req, res) => {
  const newForm = new form(req.body);
  try {
//not working with frontend
    const savedForm = await newForm.save();
    const emailText = `
    Hello, your form has been successfully submitted.\n
    Form ID: ${savedForm.formID}\n
    Resource Name: ${savedForm.resourceName}\n
    Event Name: ${savedForm.eventName}\n
    Event Details: ${savedForm.eventDetails}\n
    Approved Time: ${savedForm.approvedTime}\n
    Phone Number: ${savedForm.phoneNumber}\n
    Start Date: ${savedForm.startDate}\n
    End Date: ${savedForm.endDate}\n
    Technician: ${savedForm.Technician}\n
    Cleaning: ${savedForm.Cleaning}\n
    Sound: ${savedForm.Sound}\n
    Status: ${savedForm.isSubmitted}\n
  `;
    const mailOptions ={
      from: 'resourcemsg@outlook.com',
      to: savedForm.email,
      subject:'Form submission confirmation',
      text:emailText
    }
    await sendEmail(mailOptions)
    res.status(200).json({status: 'success',data:{
      newForm
    }});
    console.log(savedForm);
  } catch (e) {
    console.log(e)
    res.status(500).json(e);
  }
};

exports.deleteForm = async(req,res)=> {
  try{
  await form.findByIdAndDelete(req.params.id)
  res.status(200).json({status:'success',data : null})
  } catch (e) {
    res.status(500).json(e)
  }
}
//need the email in form when sending it to database
exports.sortForm = async (req, res) => {
  const currentDate = new Date();
  try {
    const results = await form
      .find({ startDate: { $gte: currentDate } })
      .exec();
    console.log(results);
  } catch (err) {
    
  }
};

exports.changeFormStatus = async(req,res) =>{
  const newStatus = req.body.newStatus;
  const user = req.params.id;
  try{
    await form.findByIdAndUpdate(user, {status: newStatus});
  }catch(err){
    res.status(500).json(err);
  }
}