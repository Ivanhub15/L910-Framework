const { readJson, writeJson } = require('../../../utils/fileDb');
const DATA_PATH = 'src/apps/variant12/data/products.json';

module.exports = (app) => {
  app.get('/products', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/products/:id', (req, res) => {
    const products = readJson(DATA_PATH);
    const product = products.find(p => p.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  });

  app.post('/products', (req, res) => {
    const products = readJson(DATA_PATH);
    const newProduct = { id: Date.now(), ...req.body };

    products.push(newProduct);
    writeJson(DATA_PATH, products);

    res.status(201).json(newProduct);
  });

  app.put('/products/:id', (req, res) => {
    const products = readJson(DATA_PATH);
    const index = products.findIndex(p => p.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products[index] = { id: products[index].id, ...req.body };
    writeJson(DATA_PATH, products);

    res.json(products[index]);
  });

  app.patch('/products/:id', (req, res) => {
    const products = readJson(DATA_PATH);
    const product = products.find(p => p.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    Object.assign(product, req.body);
    writeJson(DATA_PATH, products);

    res.json(product);
  });

  app.delete('/products/:id', (req, res) => {
    const products = readJson(DATA_PATH)
      .filter(p => p.id !== Number(req.params.id));

    writeJson(DATA_PATH, products);
    res.json({ deleted: true });
  });
};




