const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection(s) and schema(s) for Zutor DB

let Student = new Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  school: {
    type: String
  },
  major: {
    type: String
  }
},{
    collection: 'student'
});

let Session = new Schema({
  description: {
    type: String
  },
  student_id: {
    type: String
  },
  tutor: {
    type: String
  },
  availability: {
    type: Date
  }
},{
    collection: 'session'
},{
  strict: false
});

module.exports = {
    Student: mongoose.model('Student', Student),
    Session: mongoose.model('Session', Session)
};
