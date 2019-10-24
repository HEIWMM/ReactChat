import React from 'react'
import { NavBar } from 'antd-mobile'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LaoBanInFo from './info/laoban'
import DaShenInFo from './info/dashen'
import LaoBan from './Laobans'
import Dashen from './Dashens'
import Message from './message'
import Personal from './personal'
import Chat from './Chat'
import NavFooter from './nav-footer/nav-footer'
import Cookies from 'js-cookies'
import { getUser } from '../redux/actions'
class Main extends React.Component {
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laobans', // 路由路径
            component: LaoBan,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
            hide: true
        },
        {
            path: '/dashens', // 路由路径
            component: Dashen,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
            hide: true
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]
    componentDidMount() {
        const userid = Cookies.getItem('userid')
        const { _id } = this.props.user;
        if (userid && !_id) {
            this.props.getUser();
        }
    }
    render() {
        const userid = Cookies.getItem('userid')
        if (!userid) {
            return <Redirect to='/login' />
        }

        const { user,unReadCount } = this.props
        if (!user._id) {
            return null
        } else {
            // 如果有_id, 显示对应的界面
            // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
            let path = this.props.location.pathname
            if (path === '/') {
                // 得到一个重定向的路由路径
                path = `/${user.type}s`
                return <Redirect to={path} />
            }
        }
        
        const { navList } = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav => nav.path === path) // 得到当前的nav, 可能没有       
        if (currentNav) {
            // 决定哪个路由需要隐藏
            if (user.type === 'laoban') {
                // 隐藏数组的第2个    
                navList[0].hide = false
                navList[1].hide = true
            } else {
                // 隐藏数组的第1个                
                navList[1].hide = false
                navList[0].hide = true
            }
        }
        return (

            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    <Route path='/dasheninfo' component={DaShenInFo} />
                    <Route path='/laobaninfo' component={LaoBanInFo} />
                    <Route path='/laobans' component={LaoBan} />
                    <Route path='/dashens' component={Dashen} />
                    <Route path='/message' component={Message} />
                    <Route path='/personal' component={Personal} />
                    <Route path='/chat/:userid' component={Chat}/>

                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
            </div>)
    }
}
export default connect(
    state => ({ user: state.user,unReadCount: state.userChat.unReadCount }),
    { getUser }
)(Main)