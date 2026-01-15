const { readJson, writeJson } = require('../../../utils/fileDb');

const DATA_PATH = 'src/apps/twitch/data/streams.json';

function streamsRoutes(app) {
  app.get('/streams', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/streams/:id', (req, res) => {
    const streams = readJson(DATA_PATH);
    const stream = streams.find(s => s.id === Number(req.params.id));

    if (!stream) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    res.json(stream);
  });

  app.post('/streams', (req, res) => {
    const streams = readJson(DATA_PATH);

    const newStream = {
      id: Date.now(),
      ...req.body,
    };

    streams.push(newStream);
    writeJson(DATA_PATH, streams);

    res.status(201).json(newStream);
  });

  app.patch('/streams/:id', (req, res) => {
    const streams = readJson(DATA_PATH);
    const stream = streams.find(s => s.id === Number(req.params.id));

    if (!stream) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    Object.assign(stream, req.body);
    writeJson(DATA_PATH, streams);

    res.json(stream);
  });

  app.delete('/streams/:id', (req, res) => {
    const streams = readJson(DATA_PATH);
    const filtered = streams.filter(s => s.id !== Number(req.params.id));

    writeJson(DATA_PATH, filtered);
    res.json({ deleted: true });
  });
}

module.exports = streamsRoutes;
