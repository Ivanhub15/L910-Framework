const bodyParser = require('./utils/bodyParser');
const { createApp } = require('./framework/app');

const twitchApp = require('./apps/twitch');
const variant11 = require('./apps/variant11');
const variant12 = require('./apps/variant12');
const variant22 = require('./apps/variant22');

const app = createApp();

// логгер
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser);

// тестовые маршруты фреймворка
app.get('/', (req, res) => {
  res.send('Framework works');
});

app.post('/test', (req, res) => {
  res.send({ received: req.body });
});

app.delete('/test', (req, res) => {
  res.send('DELETE works');
});

app.get('/query', (req, res) => {
  res.send(req.query);
});

app.get('/users/:id', (req, res) => {
  res.send({ userId: req.params.id });
});

app.post('/status', (req, res) => {
  res.status(201).json({
    created: true,
    data: req.body,
  });
});

twitchApp(app);
variant11(app);
variant12(app);
variant22(app);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
