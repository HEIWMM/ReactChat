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
    type: String,
    post: String,
    info: String,
    company: String,
    salary: String,
});
// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
    from: { type: String, required: true }, // 发送用户的id
    to: { type: String, required: true }, // 接收用户的id
    chat_id: { type: String, required: true }, // from和to组成的字符串
    content: { type: String, required: true }, // 内容
    read: { type: Boolean, default: false }, // 标识是否已读
    create_time: { type: Number } // 创建时间
})
const model = {
    User: mongoose.model('User', user),
    ChatModel: mongoose.model('Chat', chatSchema)
};

module.exports = model;