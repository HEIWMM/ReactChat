
const User = require('./db.js').User
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
            res.send({ code: 1 , msg: '用户名或者密码错误' })
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
    User.find({ type }, { password: 0, type: 0, _id: 0, __v: 0 }, function (err, ret) {
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
module.exports = router
