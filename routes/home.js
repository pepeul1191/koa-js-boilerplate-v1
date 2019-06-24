const Router = require('koa-trie-router');
var models = require('../configs/models');

let router = new Router();

router.get('/', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = 'Hello';
});

router.get('/xd', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = 'xd';
});

router.get('/db/insert', async (ctx, next) => {
  var demo = new models.Test({
    title: 'Michel',
    content: 'hola mudo',
  });
  demo.save().then(function(result) {
    /*
    post = result = {
        id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
        title: "Hello World!",
        content: "This is an example.",
        idAuthor: "3851d8b4-5358-43f2-ba23-f4d481358901",
        author: {
            id: "3851d8b4-5358-43f2-ba23-f4d481358901",
            name: "Michel"
        }
    }
    */
    console.log(result);
    ctx.set('Content-Type', 'text/html');
    ctx.body = 'xd1';
  }).error(function(res){
    console.log(res);
  });
  ctx.set('Content-Type', 'text/html');
  ctx.body = 'xd2';
});

exports.routes = router.middleware();
