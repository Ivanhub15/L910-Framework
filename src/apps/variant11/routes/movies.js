const { readJson, writeJson } = require('../../../utils/fileDb');
const DATA_PATH = 'src/apps/variant11/data/movies.json';

module.exports = (app) => {
  app.get('/movies', (req, res) => {
    res.json(readJson(DATA_PATH));
  });

  app.get('/movies/:id', (req, res) => {
    const movies = readJson(DATA_PATH);
    const movie = movies.find(m => m.id === Number(req.params.id));

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
  });

  app.post('/movies', (req, res) => {
    const movies = readJson(DATA_PATH);
    const newMovie = { id: Date.now(), ...req.body };

    movies.push(newMovie);
    writeJson(DATA_PATH, movies);

    res.status(201).json(newMovie);
  });

  app.put('/movies/:id', (req, res) => {
    const movies = readJson(DATA_PATH);
    const index = movies.findIndex(m => m.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movies[index] = { id: movies[index].id, ...req.body };
    writeJson(DATA_PATH, movies);

    res.json(movies[index]);
  });

  app.patch('/movies/:id', (req, res) => {
    const movies = readJson(DATA_PATH);
    const movie = movies.find(m => m.id === Number(req.params.id));

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    Object.assign(movie, req.body);
    writeJson(DATA_PATH, movies);

    res.json(movie);
  });

  app.delete('/movies/:id', (req, res) => {
    const movies = readJson(DATA_PATH)
      .filter(m => m.id !== Number(req.params.id));

    writeJson(DATA_PATH, movies);
    res.json({ deleted: true });
  });
};
