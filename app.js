/*
 * @Author: your name
 * @Date: 2020-10-29 11:29:50
 * @LastEditTime: 2020-11-02 08:51:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2demo\app.js
 */
const koa = require('koa')
let app = new koa()

const views = require('koa-views')
const static = require('koa-static')
const body = require('koa-bodyparser')
const cors = require('koa2-cors')
const db = require('./db/config')
const index = require('./routes/index')
const user = require('./routes/admin')

app.use(body())
app.use(cors());
app.use(static(__dirname + '/static'))

app.use(user.routes()).use(index.allowedMethods())
app.use(index.routes()).use(index.allowedMethods())

db.connect()

app.listen(3000)

