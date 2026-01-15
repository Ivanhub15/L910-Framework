function bodyParser(req, res, next) {
  if (req.method === 'GET' || req.method === 'DELETE') {
    return next();
  }

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    if (!body) {
      req.body = {};
      return next();
    }

    try {
      req.body = JSON.parse(body);
      next();
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON');
    }
  });
}

module.exports = bodyParser;
