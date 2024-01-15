const restify = require('restify');

const app = restify.createServer();

app.use((req, res, next) => {
  console.warn('run for all routes');
  next();
});

const middleware1 = (req, res, next) => {
  console.warn('middleware1');
  next();
};

app.get('/', middleware1, (req, res, next) => {
  res.send('Hello World!');
  next();
});

app.post('/posts/:postId/comments/:commentId', async (req, res) => {
  const headers = req.headers;
  const { postId, commentId } = req.params;
  const query = req.getQuery();
  const body = req.body;

  res.send({ headers, postId, commentId, query, body });
});

app.listen(3000, function () {
  console.log('%s listening at %s', app.name, app.url);
});
