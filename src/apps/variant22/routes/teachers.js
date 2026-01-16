const { readJson, writeJson } = require('../../../utils/fileDb');
const DATA_PATH = 'src/apps/variant22/data/teachers.json';

module.exports = (app) => {
  app.get('/teachers', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/teachers/:id', (req, res) => {
    const teachers = readJson(DATA_PATH);
    const teacher = teachers.find(t => t.id === Number(req.params.id));

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  });

  app.post('/teachers', (req, res) => {
    const teachers = readJson(DATA_PATH);
    const newTeacher = { id: Date.now(), ...req.body };

    teachers.push(newTeacher);
    writeJson(DATA_PATH, teachers);

    res.status(201).json(newTeacher);
  });

  app.patch('/teachers/:id', (req, res) => {
    const teachers = readJson(DATA_PATH);
    const teacher = teachers.find(t => t.id === Number(req.params.id));

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    Object.assign(teacher, req.body);
    writeJson(DATA_PATH, teachers);

    res.json(teacher);
  });

  app.delete('/teachers/:id', (req, res) => {
    const teachers = readJson(DATA_PATH)
      .filter(t => t.id !== Number(req.params.id));

    writeJson(DATA_PATH, teachers);
    res.json({ deleted: true });
  });
};
