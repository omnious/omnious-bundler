'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

// Global import
const Koa = require('koa');
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
          ctx.status = status;
          ctx.set(headers);
        }
      },
      next
    );
  });
  devServer.use(async (ctx, next) => {
    const filename = resolve(devConfig.output.path, 'index.html');

    try {
      const result = await new Promise((resolve, reject) => {
        compiler.outputFileSystem.readFile(filename, (err, output) => {
          if (err) {
            reject(err);
          }

          resolve(output);
        });
      });
      ctx.set('content-type', 'text/html');
      ctx.body = result;
    } catch (err) {
      next(err);
    }
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
      process.exit(code || 0);
    });
  }
};
