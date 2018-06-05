//添加子路由
const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
	console.log(ctx.request.query.name);
    ctx.body = 'this is a users/bar response'+ctx.request.query.name;
})

module.exports = router
