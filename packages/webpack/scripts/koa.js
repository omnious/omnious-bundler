'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

// Global import
const Koa = require('koa');
// const koaWebpack = require('koa-webpack');
const opn = require('opn');
const { resolve } = require('path');
const { PassThrough } = require('stream');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

// Local import
const log = require('./log');
const webpackConfig = require('../src/Bundler');
const { env, host, port } = require('../src/utils/env');

module.exports.useKoa = async options => {
  // Initialize console
  console.clear();
  log.start(`Starting build in ${env} mode`);

  // Set DevServer
  const devConfig = webpackConfig(env, options);
  const compiler = webpack(devConfig);
  const devServer = new Koa();
  const expressDevMiddleware = devMiddleware(compiler, {
    logLevel: 'warn',
    publicPath: devConfig.output.publicPath
  });
  const expressHotMiddleware = hotMiddleware(compiler);

  // Set middleware
  devServer.use(async (ctx, next) => {
    await expressDevMiddleware(
      ctx.req,
      {
        end: content => {
          ctx.body = content;
        },
        setHeader: (name, value) => {
          ctx.set(name, value);
        }
      },
      next
    );
  });
  devServer.use(async (ctx, next) => {
    const stream = new PassThrough();
    ctx.body = stream;
    await expressHotMiddleware(
      ctx.req,
      {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          console.log('headers!', headers);
          ctx.status = status;
          ctx.set(headers);
        }
      },
      next
    );
  });
  devServer.use(async (ctx, next) => {
    console.log('enter!!!');
    const filename = resolve(devConfig.output.path, 'index.html');
    const result = await compiler.outputFileSystem.readFile(filename);
    console.log('check!', result);
    // , (err, result) => {
    //   if (err) {
    //     next(err);
    //   }

    //   ctx.set('content-type', 'text/event-stream');
    //   ctx.body = result;
    // });
    // ctx.response.type = 'text/html';
    // ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
  });

  // Start server
  devServer.listen(port, host, err => {
    if (err) {
      log.error(err);
    } else {
      const url = `http://${host}:${port}`;
      log.end(`Setting timer to open browser at ${url}, in ${env}`);
      opn(url);
    }
  });

  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, code => {
      log.info('Shutting down app');
      devServer.close();
      process.exit(code || 0);
    });
  }
};
