
const User = require('./db.js').User
const ChatModel = require('./db.js').ChatModel
const md5 = require('blueimp-md5')
const express = require('express')
var router = express.Router()
router.get('/aa', (req, res) => res.send('RouterSuccess'))

router.post('/register', (req, res) => {
    //console.log(req,res);
    const { username, password, type } = req.body;
    User.findOne({ username }, { password: 0 }, (err, user) => {
        if (user) {
            const data = { username, type, _id: user._id }
            console.log(user)
            res.send({ code: 1, data, msg: '用户已存在' })
        } else {
            new User({ username, type, password: md5(password) }).save(function (err, user) {
                if (err) {
                    return res.send({ msg: 'error' });
                }
                else {
                    res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 });
                    const data = { username, type, _id: user._id }
                    res.send({ code: 0, data, msg: '注册成功' });
                }

            })

        }
    })
    console.log(req.body);
    //res.send(JSON.stringify(req.body));
})
router.post('/login', (req, res) => {
    //console.log(req,res);
    const { username, password, type } = req.body;
    User.findOne({ username, password, type }, { password: 0 }, (err, user) => {
        if (!user) {
            //const data = { username, type, _id: user._id }
            //console.log(user)
            res.send({ code: 1, msg: '用户名或者密码错误' })
        } else {

            res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 });
            const data = { username, type, _id: user._id }
            console.log(user)
            res.send({ code: 0, data, msg: '登录成功' });


        }
    })
    console.log(req.body);
    //res.send(JSON.stringify(req.body));
})
router.post('/update', (req, res) => {
    const { post, info, company, salary } = req.body
    const userid = req.cookies.userid
    User.findByIdAndUpdate(userid, {
        post, info, company, salary
    }, function (err, ret) {
        if (err) {

            console.log(err)//更新失败
        }
        else {
            //更新成功
            //ret参数包含更新的数据
            console.log(ret)
        }
    })
    console.log(req.cookies);
})
router.get('/laoban', (req, res) => {
    const { type } = req.query;

    console.log(type)
    User.find({ type }, { password: 0, type: 0, __v: 0 }, function (err, ret) {
        if (err) {
            console.log(err)//更新失败
            res.send({ code: 1, err, msg: '查询失败' });

        }
        else {
            //更新成功
            //ret参数包含更新的数据
            console.log('ret');
            res.send({ code: 0, ret, msg: '查询成功' });

            //return ret;
        }
    })
    console.log(req.cookies);


})
router.get('/dashen', (req, res) => {
    const { type } = req.query;

    console.log(type)
    User.find({ type }, { password: 0, type: 0, __v: 0 }, function (err, ret) {
        if (err) {
            console.log(err)//更新失败
            res.send({ code: 1, err, msg: '查询失败' });

        }
        else {
            //更新成功
            //ret参数包含更新的数据
            console.log('ret');
            res.send({ code: 0, ret, msg: '查询成功' });

            //return ret;
        }
    })
    console.log(req.cookies);


})
router.get('/user', (req, res) => {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.send({ code: 1, msg: '请先登录' })
    }
    User.findOne({ _id: userid }, {password:0}, function (error, user) {
        if (user) {
            res.send({ code: 0, data: user })
        } else {
            // 通知浏览器删除userid cookie
            res.clearCookie('userid')
            res.send({ code: 1, msg: '请先登陆' })
        }

    })

})
router.get('/msglist', function (req, res) {
    // 获取cookie中的userid
    const userid = req.cookies.userid
    // 查询得到所有user文档数组
    User.find(function (err, userDocs) {
      // 用对象存储所有user信息: key为user的_id, val为name和header组成的user对象
      /*const users = {} // 对象容器
      userDocs.forEach(doc => {
        users[doc._id] = {username: doc.username, header: doc.header}
      })*/
      
      const users = userDocs.reduce((users, user) => {
        users[user._id] = {username: user.username, header: user.header}
        return users
      } , {})
      /*
      查询userid相关的所有聊天信息
       参数1: 查询条件
       参数2: 过滤条件
       参数3: 回调函数
      */
      ChatModel.find({'$or': [{from: userid}, {to: userid}]}, {password: 0, __v: 0}, function (err, chatMsgs) {
        // 返回包含所有用户和当前用户相关的所有聊天消息的数据
        res.send({code: 0, data: {users, chatMsgs}})
      })
    })
  })
  /*
修改指定消息为已读
 */
router.post('/readmsg', function (req, res) {
    // 得到请求中的from和to
    const from = req.body.from
    const to = req.cookies.userid
    /*
    更新数据库中的chat数据
    参数1: 查询条件
    参数2: 更新为指定的数据对象
    参数3: 是否1次更新多条, 默认只更新一条
    参数4: 更新完成的回调函数
     */
    ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
      console.log('/readmsg', doc)
      res.send({code: 0, data: doc.nModified}) // 更新的数量
    })
  })
module.exports = router
