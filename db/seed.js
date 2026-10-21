// Demo data, loaded by the mongo image the first time the database volume is created.
// Everything here is fake. Demo login: demo@zutor.test / demo1234
db = db.getSiblingDB('ZutorDB');

const DAY = 24 * 60 * 60 * 1000;

// A date `days` from now at the given hour, so demo sessions are always upcoming
function inDays(days, hour) {
  const d = new Date(Date.now() + days * DAY);
  d.setUTCHours(hour, 0, 0, 0);
  return d;
}

db.student.insertMany([
  {
    _id: '000000000000000000000001',
    first_name: 'Demo',
    last_name: 'Student',
    email: 'demo@zutor.test',
    password: 'demo1234',
    school: 'University of Houston',
    major: 'Computer Science'
  },
  {
    _id: '000000000000000000000002',
    first_name: 'Sam',
    last_name: 'Sample',
    email: 'sam@zutor.test',
    password: 'sample1234',
    school: 'Rice University',
    major: 'Mathematics'
  }
]);

db.session.insertMany([
  { description: 'Calculus III homework', student_id: '000000000000000000000001', tutor: 'Ms. Kelly', availability: inDays(2, 15) },
  { description: 'Java study session', student_id: '000000000000000000000001', tutor: 'Mr. Pancake', availability: inDays(5, 18) },
  { description: 'Statistics exam prep', student_id: '000000000000000000000002', tutor: 'Mike Johnson', availability: inDays(3, 16) }
]);

print('Zutor demo data loaded');
