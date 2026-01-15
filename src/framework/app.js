const http = require('http');

function createApp() {
  const middlewares = [];
  const routes = [];

  const app = {};

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  // регистрация middleware
  app.use = (middleware) => {
    middlewares.push(middleware);
  };

  // регистрация маршрутов
  methods.forEach((method) => {
    app[method.toLowerCase()] = (path, handler) => {
      routes.push({
        method,
        path,
        handler,
      });
    };
  });

  // запуск сервера
  app.listen = (port, callback) => {
    const server = http.createServer((req, res) => {
      const { method } = req;
      const [path, queryString] = req.url.split('?');

      req.query = {};

      if (queryString) {
        queryString.split('&').forEach((pair) => {
          const [key, value] = pair.split('=');
          req.query[key] = decodeURIComponent(value);
        });
      }

      let route = null;

      req.params = {};

      for (const r of routes) {
        if (r.method !== method) continue;

        const routeParts = r.path.split('/');
        const pathParts = path.split('/');

        if (routeParts.length !== pathParts.length) continue;

        let matched = true;

        routeParts.forEach((part, index) => {
          if (part.startsWith(':')) {
            const key = part.slice(1);
            req.params[key] = pathParts[index];
          } else if (part !== pathParts[index]) {
            matched = false;
          }
        });

        if (matched) {
          route = r;
          break;
        } else {
          req.params = {};
        }
      }


      let idx = 0;

      const next = () => {
        if (idx < middlewares.length) {
          const middleware = middlewares[idx];
          idx++;
          middleware(req, res, next);
        } else {
          if (!route) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Not Found');
          }

          // расширяем response
          let statusCode = 200;

          res.status = (code) => {
            statusCode = code;
            return res;
          };

          res.json = (data) => {
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          };

          res.send = (data) => {
            if (typeof data === 'object') {
              res.json(data);
            } else {
              res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
              res.end(data);
            }
          };


          route.handler(req, res);
        }
      };

      next();
    });

    server.listen(port, callback);
  };

  return app;
}

module.exports = { createApp };
