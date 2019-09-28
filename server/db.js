const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/User', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open', () => {
    console.log('连接成功');//成功连接
});
const user = mongoose.Schema({
    username: String,
    password: String,
    type: String
});
const model = {
    User: mongoose.model('User', user),  
};
module.exports = model;