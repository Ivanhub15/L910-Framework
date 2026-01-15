const channelsRoutes = require('./routes/channels');
const streamsRoutes = require('./routes/streams');

function twitchApp(app) {
  channelsRoutes(app);
  streamsRoutes(app);
}

module.exports = twitchApp;
