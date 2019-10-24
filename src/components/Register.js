import React from 'react'
import Logo from './constant/logo.js'
import { Toast, List, InputItem, NavBar, Icon, WingBlank, WhiteSpace, Radio, Button } from 'antd-mobile';
import Sass from '../css/register.scss'
import { connect } from 'react-redux'
import { register } from '../redux/actions'
import { Redirect } from 'react-router-dom'
const ListItem = List.Item;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordT: '',
            type: ''
        }
    }
    totoast = () => {
        Toast.offline('用户名已存在 !!!', 1);
    }
    handleRegister = () => {
        const { username, password, passwordT, type } = this.state;
        if (username && password && passwordT && type) {
            this.props.register(this.state).then((e) => {
                const { topath } = this.props.data
                if (!topath) {
                    this.totoast();
                }
            })

        }

    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })//对象里面属性名如果是变量，就加一个[]
    }
    render() {
        const { topath } = this.props.data
        // 如果redirectTo有值, 就需要重定向到指定的路由
        if (topath) {
            return <Redirect to={topath} />
        }
        //console.log(this.props);
        return (
            <div className={Sass.register}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Register</NavBar>
                <WhiteSpace />
                <Logo />
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <InputItem type="text" placeholder="请输入用户名"
                            clear value={this.state.username}
                            onChange={val => this.handleChange('username', val)}>用户名</InputItem>
                        <InputItem type="password" placeholder="请输入密码"
                            clear value={this.state.password}
                            onChange={val => this.handleChange('password', val)}>密码</InputItem>
                        <InputItem type="password" placeholder="请确认密码" clear
                            value={this.state.passwordT}
                            onChange={val => this.handleChange('passwordT', val)}>确认密码</InputItem>
                        <ListItem>
                            <span>用户类型</span>
                            <Radio checked={this.state.type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
                            <Radio checked={this.state.type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
                        </ListItem>
                    </List>;
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={() => this.props.history.replace('/login')}>已有账户</Button>
                    <WhiteSpace />
                </WingBlank>

            </div>)
    }
}
export default connect(
    state => ({ data: state.user }),
    { register }
)(Register)