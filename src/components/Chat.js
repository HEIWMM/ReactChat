import React from 'react'
import { NavBar, Icon, List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, readMsg } from '../redux/actions'
import Cookies from 'js-cookies'
//import SocketT from './constant/test_io.js'
const Item = List.Item
class Chat extends React.Component {
  constructor(props) {
    super(props)
    const useridT = this.props.match.params.userid
    console.log(this.props.match.params.userid);
    this.state = {
      userid: '',
      username: '',
      from: '',
      to: useridT,
      content: ''
    }
  }
  componentDidMount() {
    const useridF = Cookies.getItem('userid').substring(3, 27)
    this.setState({
      from: useridF,
    });
    
  }
  componentWillUnmount () { // 在退出之前
    // 发请求更新消息的未读状态
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }
  handleSend = () => {
    const chatdata = {
      from: this.state.from,
      to: this.state.to,
      content: this.state.content
    }
    this.props.sendMsg(chatdata)
    
  }
  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat
    // 计算当前聊天的chatId
    console.log(this.props.chat)
    const meId = user._id
    if (users[meId]===undefined) { // 如果还没有获取数据,不做任何显示
      return null
    }
    
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')
    const targetname = users[targetId].username
    // 对chatMsgs进行过滤
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}>
          {targetname}
        </NavBar>
        {/* <SocketT /> */}
        <List>
          <List style={{ marginTop: 50, marginBottom: 50 }}>
            {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
            
              {
                msgs.map(msg => {
                  if (targetId === msg.from) {// 对方发给我的
                    return (
                      <Item
                        key={msg._id}
                        extra={targetname}
                      >
                        {msg.content}
                      </Item>
                    )
                  } else { // 我发给对方的
                    return (
                      <Item
                        key={msg._id}
                  
                        extra='我'
                      >
                        {msg.content}
                      </Item>
                    )
                  }
                })
              }
          

          </List>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={val => this.setState({ content: val })}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span>
                {/* <span onClick={this.toggleShow} style={{ marginRight: 5 }}>😊</span> */}
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />
        </div>
      </div>)
  }
}
export default connect(
  state => ({ user: state.user, chat: state.userChat }),
  { sendMsg, readMsg }
)(Chat)