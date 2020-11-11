/*
 * @Author: your name
 * @Date: 2020-11-02 08:44:19
 * @LastEditTime: 2020-11-02 08:50:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2demo\db\config.js
 */
const mongoose = require('mongoose')

module.exports = {
  connect: () => {
    mongoose.connect('mongodb://127.0.0.1:27017/traveldb')

    let connection = mongoose.connection

    connection.on('connected', () => {
      console.log('数据库连接成功')
    })

    connection.on('error', (error) => {
      console.log(`数据库连接失败${error}`)
    })
  }
}

