const { readJson, writeJson } = require('../../../utils/fileDb');
const DATA_PATH = 'src/apps/variant12/data/orders.json';

module.exports = (app) => {
  app.get('/orders', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/orders/:id', (req, res) => {
    const orders = readJson(DATA_PATH);
    const order = orders.find(o => o.id === Number(req.params.id));

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  });

  app.post('/orders', (req, res) => {
    const orders = readJson(DATA_PATH);
    const newOrder = { id: Date.now(), ...req.body };

    orders.push(newOrder);
    writeJson(DATA_PATH, orders);

    res.status(201).json(newOrder);
  });

  app.patch('/orders/:id', (req, res) => {
    const orders = readJson(DATA_PATH);
    const order = orders.find(o => o.id === Number(req.params.id));

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    Object.assign(order, req.body);
    writeJson(DATA_PATH, orders);

    res.json(order);
  });

  app.delete('/orders/:id', (req, res) => {
    const orders = readJson(DATA_PATH)
      .filter(o => o.id !== Number(req.params.id));

    writeJson(DATA_PATH, orders);
    res.json({ deleted: true });
  });
};
