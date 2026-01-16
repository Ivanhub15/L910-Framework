const { readJson, writeJson } = require('../../../utils/fileDb');
const DATA_PATH = 'src/apps/variant22/data/courses.json';

module.exports = (app) => {
  app.get('/courses', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/courses/:id', (req, res) => {
    const courses = readJson(DATA_PATH);
    const course = courses.find(c => c.id === Number(req.params.id));

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  });

  app.post('/courses', (req, res) => {
    const courses = readJson(DATA_PATH);
    const newCourse = { id: Date.now(), ...req.body };

    courses.push(newCourse);
    writeJson(DATA_PATH, courses);

    res.status(201).json(newCourse);
  });

  app.put('/courses/:id', (req, res) => {
    const courses = readJson(DATA_PATH);
    const index = courses.findIndex(c => c.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }

    courses[index] = { id: courses[index].id, ...req.body };
    writeJson(DATA_PATH, courses);

    res.json(courses[index]);
  });

  app.patch('/courses/:id', (req, res) => {
    const courses = readJson(DATA_PATH);
    const course = courses.find(c => c.id === Number(req.params.id));

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    Object.assign(course, req.body);
    writeJson(DATA_PATH, courses);

    res.json(course);
  });

  app.delete('/courses/:id', (req, res) => {
    const courses = readJson(DATA_PATH)
      .filter(c => c.id !== Number(req.params.id));

    writeJson(DATA_PATH, courses);
    res.json({ deleted: true });
  });
};
