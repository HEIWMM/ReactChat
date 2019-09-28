const User = require('./db.js').User
const md5 = require('blueimp-md5')
const express = require('express')
var router = express.Router()
router.get('/aa',(req, res) => res.send('RouterSuccess'))
router.post('/register',(req, res) => {
    //console.log(req,res);
    const {username,password,type} = req.body;
    User.findOne({username},{password:0},(err,user)=>{
        if(user){
            const data = {username,type,_id:user._id}
            console.log(user)
            res.send({code:1,data,msg:'用户已存在'})
        }else{
            new User({username,type,password:md5(password)}).save(function(err,user){
                if(err){
                    return res.send({msg:'error'});
                }
                else{
                    res.cookie('userid',user._id,{maxAge:1000*60*60*24});
                    const data = {username,type,_id:user._id}
                    res.send({code:0,data,msg:'注册成功'});
                }
                
            })
            
        }
    })
    console.log(req.body);
    //res.send(JSON.stringify(req.body));
})
module.exports = router
