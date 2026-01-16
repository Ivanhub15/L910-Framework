const courses = require('./routes/courses');
const teachers = require('./routes/teachers');

module.exports = (app) => {
  courses(app);
  teachers(app);
};
