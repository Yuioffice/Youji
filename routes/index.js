/*
 * @Author: your name
 * @Date: 2020-10-30 09:59:34
 * @LastEditTime: 2020-11-02 08:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2demo\routes\index.js
 */
const router = require('@koa/router')()
const discoverModel = require('../db/schema/discoverSchema.js')
const indexModel = require('../db/schema/indexSchema.js')
const indexcontentModel = require('../db/schema/indexcontentSchema.js')
const journeyModel = require('../db/schema/journeySchema.js')
const publishModel = require('../db/schema/publishSchema.js')
const searchlistsModel = require('../db/schema/searchlistsSchema.js')
const searchtextModel = require('../db/schema/searchtextSchema.js')

router.get('/', async (ctx) => {
  let result = await indexModel.find()
  let content = await indexcontentModel.find()
  ctx.body = {
    data: {
      result,
	  content
    }
  }
  
})

router.get('/discover', async (ctx) => {
  let result = await discoverModel.find()
  ctx.body = {
    data: {
      result
    }
  }
})

router.get('/journey', async (ctx) => {
  let result = await journeyModel.find()
  ctx.body = {
    data: {
      result
    }
  }
})

router.get('/publish', async (ctx) => {
  let result = await publishModel.find()
  let mypublish = await publishModel.insert()
  ctx.body = {
    data: {
      result
    }
  }
})
router.get('/search/searchlists', async (ctx) => {
	let searchValue = ctx.query.searchValue;
	console.log(searchValue)
	let regexp=new RegExp(searchValue,'i')
  let zonghe = await searchlistsModel.find({"text":"综合",title:{$regex:regexp}})
  let gonglue = await searchlistsModel.find({"text":"攻略",title:{$regex:regexp}})
  let menpiao = await searchlistsModel.find({"text":"景点门票",title:{$regex:regexp}})
  let zhusu = await searchlistsModel.find({"text":"附近住宿",title:{$regex:regexp}})
  let meishi = await searchlistsModel.find({"text":"附近美食",title:{$regex:regexp}})
  let wenda = await searchlistsModel.find({"text":"问答",title:{$regex:regexp}})
  let user = await searchlistsModel.find({"text":"用户",title:{$regex:regexp}})
  ctx.body = {
    data: {
		zonghe,
		gonglue,
		menpiao,
		zhusu,
		meishi,
		wenda,
		user
    }
  }
})
//graphql  restful
// router.post('/login', ctx => {
//   ctx.body = '用户名' + ctx.request.body.username
// })


module.exports = router