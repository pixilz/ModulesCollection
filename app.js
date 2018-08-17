const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

console.log('Server Started...');

// x-response-time

// Tracks total response time for all middleware to load.
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

// Logs out the HTTP Request Method and the url.
app.use(async (ctx, next) => {
  await next();

  let format = ':method - :status ":url"';
  const output = format
    .replace(':method', ctx.method)
    .replace(':url', ctx.url)
    .replace(':status', ctx.status);

  console.log(output);
});

app.use(serve('public', {extensions: ['js', 'css']}));
app.use(serve('pages', {extensions: ['html']}));

// TODO - Lookup node's module.
if (!module.parent) {
  app.listen(3000);
}
