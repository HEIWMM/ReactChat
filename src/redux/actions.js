import {
    reqLogin,
    reqRegister,
    reqUpdate,
    reqUser,
    reqMsglist,
    reqReadmsg
} from '../api/axiosFun'
import io from 'socket.io-client'

const authSuccess = (data) => ({ type: 'AuthSuccess', data: data })
const authFailed = (data) => ({ type: 'AuthFailed', data: data })
const authUpdate = (data) => ({ type: 'AuthUpdate', data: data })
// 接收用户的同步action
const receiveUser = (user) => ({ type: 'ReceiveUser', data: user })
// 重置用户的同步action
export const resetUser = (msg) => ({ type: 'ResetUser', data: msg })
// 发送聊天信息
//const sendChat = ({ from, to, content }) => ({ type: 'SendMsg', data: { from, to, content } })
// 接收一个消息的同步action
const receiveMsg = (chatMsg, userid) => ({ type: 'ReceiveMsg', data: { chatMsg, userid } })
// 接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: 'ReceiveMsgList', data: { users, chatMsgs, userid } })
// 更新已读信息列表
const readChat = ({from, to, count}) => ({ type: 'ReadChat', data: { from, to, count } })
function initIO(dispatch, userid) {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if (!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io.connect('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            if (userid === chatMsg.from || userid === chatMsg.to) {
                console.log('receive');
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}
async function getMsglist(dispatch, userid) {
    initIO(dispatch, userid)
    console.log('getMsgList执行');
    const response = await reqMsglist()
    const result = response.data
    if (result.code === 0) {
        const { users, chatMsgs } = result.data
        // 分发同步action

        dispatch(receiveMsgList({ users, chatMsgs, userid }))
    }
}
export const register = (user) => {
    return async dispatch => {
        const res = await reqRegister(user);
        console.log(res);
        if (res.data.code === 0) {
            console.log('code--->0');
            getMsglist(dispatch, res.data.data._id);
            dispatch(authSuccess(res.data));

        } else {
            console.log('code--->1');
            dispatch(authFailed(res.data));
        }
    }
}
export const login = (user) => {
    return async dispatch => {
        const res = await reqLogin(user);
        if (res.code === 0) {
            getMsglist(dispatch, res.data.data._id);
            dispatch(authSuccess(res.data));
        } else {
            dispatch(authFailed(res.data));
        }
    }
}
export const update = (user) => {
    return async dispatch => {
        const res = await reqUpdate(user);
        dispatch(authUpdate(res.data));
    }
}
// 获取用户异步action
export const getUser = () => {
    return async dispatch => {
        // 执行异步ajax请求
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) { // 成功
            getMsglist(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else { // 失败
            dispatch(resetUser(result.msg))
        }
    }
}
export const sendMsg = ({ from, to, content }) => {
    return async dispatch => {
        console.log('sendMsg', { from, to, content })
        // 发消息
        io.socket.emit('sendMsg', { from, to, content })
    }
}
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadmsg({ from });
        const count = response.data.data
        //console.log(response)
        if (response.data.data) {
            dispatch(readChat({ from, to, count }))
        }

    }
}
export const handleChange = () => ({ type: 'handleC' })