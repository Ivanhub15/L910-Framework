const { readJson, writeJson } = require('../../../utils/fileDb');
const DATA_PATH = 'src/apps/variant11/data/tickets.json';

module.exports = (app) => {
  app.get('/tickets', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/tickets/:id', (req, res) => {
    const tickets = readJson(DATA_PATH);
    const ticket = tickets.find(t => t.id === Number(req.params.id));

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  });

  app.post('/tickets', (req, res) => {
    const tickets = readJson(DATA_PATH);
    const newTicket = { id: Date.now(), ...req.body };

    tickets.push(newTicket);
    writeJson(DATA_PATH, tickets);

    res.status(201).json(newTicket);
  });

  app.patch('/tickets/:id', (req, res) => {
    const tickets = readJson(DATA_PATH);
    const ticket = tickets.find(t => t.id === Number(req.params.id));

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    Object.assign(ticket, req.body);
    writeJson(DATA_PATH, tickets);

    res.json(ticket);
  });

  app.delete('/tickets/:id', (req, res) => {
    const tickets = readJson(DATA_PATH)
      .filter(t => t.id !== Number(req.params.id));

    writeJson(DATA_PATH, tickets);
    res.json({ deleted: true });
  });
};
