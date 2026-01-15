const { readJson, writeJson } = require('../../../utils/fileDb');

const DATA_PATH = 'src/apps/twitch/data/channels.json';

function channelsRoutes(app) {
  app.get('/channels', (req, res) => {
    const channels = readJson(DATA_PATH);
    res.json(channels);
  });

  app.get('/channels/:id', (req, res) => {
    const channels = readJson(DATA_PATH);
    const channel = channels.find(c => c.id === Number(req.params.id));

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    res.json(channel);
  });

  app.post('/channels', (req, res) => {
    const channels = readJson(DATA_PATH);

    const newChannel = {
      id: Date.now(),
      ...req.body,
    };

    channels.push(newChannel);
    writeJson(DATA_PATH, channels);

    res.status(201).json(newChannel);
  });

  app.put('/channels/:id', (req, res) => {
    const channels = readJson(DATA_PATH);
    const index = channels.findIndex(c => c.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    channels[index] = {
      id: channels[index].id,
      ...req.body,
    };

    writeJson(DATA_PATH, channels);
    res.json(channels[index]);
  });

  app.patch('/channels/:id', (req, res) => {
    const channels = readJson(DATA_PATH);
    const channel = channels.find(c => c.id === Number(req.params.id));

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    Object.assign(channel, req.body);
    writeJson(DATA_PATH, channels);

    res.json(channel);
  });

  app.delete('/channels/:id', (req, res) => {
    const channels = readJson(DATA_PATH);
    const filtered = channels.filter(c => c.id !== Number(req.params.id));

    writeJson(DATA_PATH, filtered);
    res.json({ deleted: true });
  });
}

module.exports = channelsRoutes;
