/* eslint-disable */
import { combineReducers } from 'redux'

const initialState = [{
    id: 0,
    value: 15
}]
const initUser = {
    _id: '',
    username: '',
    type: '',
    msg: '',
    topath: ''
}

function handlePath(type) {

    return '/' + type + 'info'
}
function user(state = initUser, action) {
    switch (action.type) {
        case 'AuthSuccess':
            return { ...action.data.data, msg: action.data.msg, topath: handlePath(action.data.data.type) };
        case 'AuthFailed':
            return { ...action.data.data, msg: action.data.msg, topath: ' ' };
        // return state.filter((item)=>{
        //     if(item.username)
        // })
        case 'ReceiveUser': // data是user
            return action.data
        case 'ResetUser': // data是msg
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}
const initChat = {
    users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
    chatMsgs: [], // 当前用户所有相关msg的数组
    unReadCount: 0 // 总的未读数量
}
function userChat(state = initChat, action) {
    switch (action.type) {
        case 'ReceiveMsg':
            const { chatMsg } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case 'ReceiveMsgList':
            const { users, chatMsgs, userid } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
            }
        case 'ReadChat':
            const { from, to, count } = action.data;
            
            let chatMsgss = state.chatMsgs.map(msg => {
                if ((msg.from === from) && (msg.to === to) && (msg.read===false)) { // 需要更新
                    
                    return { ...msg, read: true }
                    
                } else {// 不需要
                    
                    return msg

                }
            })
            
            return {
                users: state.users,
                chatMsgs: chatMsgss,
                unReadCount: state.unReadCount-count,
            }
        default:
            return state;
    }
}
function handle(state = initialState, action) {
    let initialState = state;
    switch (action.type) {
        case 'handleC':
            console.log(state, typeof (state));
            return initialState.map((item, index) => {
                if (item.id === 0) {
                    item.value += 1;
                }
                return item
            });
        case 'AuthFailed':
            return { action }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    handle,
    user,
    userChat
})

export default rootReducer