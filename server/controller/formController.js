const form = require("./../models/formModel");

exports.forms = async (req, res) => {
  const newForm = new form(req.body);
  try {
    const savedForm = await newForm.save();
    res.status(200).json({status: 'success',data:{
      newForm
    }});
    console.log(savedForm);
  } catch (e) {
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
    res.status(500).json(err);
  }
};
