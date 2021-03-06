const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const BrowserSync = require('browser-sync');
const webpack = require('webpack');
const chokidar = require('chokidar');

const config = require('./config');
const webpackConfig = require('../webpack.dev.config');


const globalContext = require('./global-context');


// SETUP BROWSER SYNC
const browserSync = BrowserSync.create('portfolio');

browserSync.init({
  logSnippet: false,
  notify: false,
  port: 3001,
  logLevel: 'info',
});



// SETUP SERVER
const server = new hapi.Server();
server.connection({
  port: process.env.PORT || 4000,
});


server.event('server:register:ready');


server.register(inert, (err) => {
  if (err) {
    throw err;
  }

  server.emit('server:register:ready');
});


function runWebpack(next) {
  config.logger.log('Webpack running...')
  return webpack(webpackConfig).watch({}, (err, stats) => {
    if (err) {
      config.logger.error(err, 'app.js');
    }
    config.logger.log('Webpack finished');
    next();
  });
}


function reloadBrowser() {
  config.logger.log('Reloading browsers...');
  browserSync.reload();
}


server.register(require('vision'), (err) => {
  server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    isCached: false,
    layout: true,
    path: './templates',
    layoutPath: './templates/layout',
    partialsPath: './templates/partials',
    // helpersPath: './templates/utils',
    context: globalContext,
  });
});

server.on('server:register:ready', () => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index', { stuff: 'My page' });
    },
  });

  server.route({
    method: 'GET',
    path: '/software',
    handler: (request, reply) => {
      reply.view('software');
    },
  });

  server.route({
    method: 'GET',
    path: '/design',
    handler: (request, reply) => {
      reply.view('design');
    },
  });

  server.route({
    method: 'GET',
    path: '/3d-modelling',
    handler: (request, reply) => {
      reply.view('3d');
    },
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      file: path.resolve(__dirname, '../docs/404.html'),
    },
  });

  server.route({
    method: 'GET',
    path: '/bundle/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../docs/bundle'),
        redirectToSlash: true,
        index: true,
      }
    },
  });

  server.route({
    path: "/static/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: path.resolve(__dirname, '../src/static'),
            listing: true,
            index: false
        }
    }
});

  server.start((err) => {
    if (err) {
      config.logger.error(err, 'app.js');
    }

    config.logger.log(`Server running at: ${server.info.uri}`);

    let webpackWatcher = runWebpack(reloadBrowser);

    chokidar.watch(path.resolve(__dirname, 'src'), {
      ignoreInitial: true
    })
      .on('all', () => {
        webpackWatcher.close();
        webpackWatcher = runWebpack(reloadBrowser);
      });
    });
});
