const express = require('express');
const compression = require('compression');
const path = require('path');

const port = process.env.PORT || 4200;
const disableHttps = process.env.REACT_APP_DISABLE_HTTPS ?? false;
const domain = process.env.REACT_APP_DOMAIN;
const publicPath = '/';
const outputPath = path.resolve(process.cwd(), 'build');

const app = express();

if (!!domain) {
  const redirectToDomain = (req, res, next) => {
    if (req.hostname === domain) {
      // OK, continue
      return next();
    }

    const url = `https://${domain}${req.url}`;

    res.redirect(url);
  };

  app.use(redirectToDomain);
}

// disable when testing locally
if (!disableHttps) {
  const ensureSsl = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'https') {
      // OK, continue
      return next();
    }

    const url = `https://${req.hostname}${req.url}`;

    // permanent redirect for HTTPS
    res.redirect(301, url);
  };

  app.enable('trust proxy');
  app.use(ensureSsl);
}

app.use(compression());

app.use(publicPath, express.static(outputPath));

app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));

const server = app.listen(port, () => {
  server.on('error', (error) => {
    console.error(error);
  });

  console.log('Server is running!');
  console.dir(server.address());
});
