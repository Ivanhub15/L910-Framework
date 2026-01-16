const products = require('./routes/products');
const orders = require('./routes/orders');

module.exports = (app) => {
  products(app);
  orders(app);
};
