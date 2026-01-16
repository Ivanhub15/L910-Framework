const movies = require('./routes/movies');
const tickets = require('./routes/tickets');

module.exports = (app) => {
  movies(app);
  tickets(app);
};
