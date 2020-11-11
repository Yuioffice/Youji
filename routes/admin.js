/*
 * @Author: your name
 * @Date: 2020-10-30 09:59:41
 * @LastEditTime: 2020-10-30 10:01:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \koa2demo\routes\user.js
 */
const router = require('@koa/router')()
const menuModel = require('../db/houtaiSchema/menuSchema.js')

// 后台管理
router.get('/yjmenu', async (ctx) => {
	var result = await menuModel.find({
		"is_show": 0
	})
	var lists = result.filter(p => {
		return p.pre_id == 0
	})
	ctx.body = {
		data: {
			lists
		}
	}

})


module.exports = router
