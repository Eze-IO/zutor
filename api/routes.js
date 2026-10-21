const express = require('express');
const routes = express.Router();

// Require Post model in our routes module
let Models = require('./models');

// Builds the login/register response without exposing the password
function authResponse(student) {
  const user = student.toObject();
  user.password = "";
  return { user, token: student._id };
}

// Defined store route
routes.route('/register').post(async function (req, res) {
  const password = req.body.password || "";
  if(password.length<8)
    return res.status(400).json({'Message':'Password needs to be at least 8 characters'});

  try {
    const existing = await Models.Student.findOne({ email : req.body.email });
    if(existing!==null)
      return res.status(403).json({'Message':'Email already in use'});

    let student = new Models.Student({
      email: req.body.email,
      password: password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      school: req.body.school,
      major: req.body.major
    });
    await student.save();
    res.status(200).json(authResponse(student));
  } catch (err) {
    res.status(400).json(err);
  }
});

routes.route('/login').post(async function (req, res) {
  try {
    const student = await Models.Student.findOne({ email : req.body.email });
    if(student!==null && req.body.password===student.password)
      res.status(200).json(authResponse(student));
    else
      res.status(403).json({'Message':'Invalid email & password'});
  } catch (err) {
    res.status(400).json(err);
  }
});

routes.route('/student/:id').get(async function (req, res) {
  try {
    const student = await Models.Student.findById(req.params.id);
    if (!student)
      return res.status(404).send({'Message':'Not found'});
    res.status(200).json({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

routes.route('/student/:id').put(async function (req, res) {
  try {
    const student = await Models.Student.findById(req.params.id);
    if (!student)
      return res.status(404).send({'Message':'Not found'});
    student.first_name = req.body.first_name;
    student.last_name = req.body.last_name;
    student.email = req.body.email;
    if(req.body.password && req.body.password.length>=8)
      student.password = req.body.password;
    student.school = req.body.school;
    student.major = req.body.major;
    await student.save();
    res.status(200).json(authResponse(student).user);
  } catch (err) {
    res.status(400).json(err);
  }
});

routes.route('/student/:id').delete(async function (req, res) {
  try {
    await Models.Student.findByIdAndDelete(req.params.id);
    res.status(200).json({'Message':'Student removed successfully'});
  } catch (err) {
    res.json(err);
  }
});

routes.route('/session').get(async function (req, res) {
  try {
    const sessions = await Models.Session.find({});
    res.status(200).json(sessions);
  } catch (err) {
    res.status(400).json(err);
  }
});

routes.route('/session').post(async function (req, res) {
  try {
    let _session = new Models.Session(req.body);
    await _session.save();
    res.status(200).json({'Message':'Session added successfully'});
  } catch (err) {
    res.status(400).json(err);
  }
});

routes.route('/session/:id').put(async function (req, res) {
  try {
    const session = await Models.Session.findById(req.params.id);
    if (!session)
      return res.status(404).json({'Message':'Not Found'});
    session.description = req.body.description;
    session.tutor = req.body.tutor;
    session.availability = req.body.availability;
    await session.save();
    res.status(200).json({'Message':'Session update successfully'});
  } catch {
    res.status(400).json({'Message':'Failed to update session'});
  }
});

routes.route('/session/:id').delete(async function (req, res) {
  try {
    await Models.Session.findByIdAndDelete(req.params.id);
    res.status(200).json({'Message':'Session removed successfully'});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = routes;
