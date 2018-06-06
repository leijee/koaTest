const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/users', async (ctx, next) => {
    await ctx.render('users/userPage',{
      title:'用户中心'
    })
})

router.get('/news', async (ctx, next) => {
	await ctx.render('news/newsPage',{
		title:'新闻中心'
	})
})
module.exports = router
