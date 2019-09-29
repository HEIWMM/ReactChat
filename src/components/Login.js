import React from 'react' 
import Logo from './constant/logo.js'
import md5 from 'blueimp-md5'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { List, InputItem, NavBar, Icon, WingBlank,WhiteSpace ,Radio,Button} from 'antd-mobile';
const ListItem = List.Item;
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            type:'',
            topath:''
        }
    }
    handleLogin=()=>{
        const {username,password,type} = this.state
        axios.post('/login',{username,password:md5(password),type})
            .then((data)=>{
                console.log(data);
                if(!data.data.code){
                    console.log(data.data.data.type);

                    let topath = data.data.data.type+'s';
                    this.setState({
                        topath:topath
                    })
                   
                }
                
            })
        console.log('Login');
    }
    handleChange=(name,val)=>{
        this.setState({
            [name]: val
        })//对象里面属性名如果是变量，就加一个[]
    }
    render() {
        if(this.state.topath){
            return <Redirect to={this.state.topath} />
        }
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Login</NavBar>
                <WhiteSpace />
                <Logo />
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <InputItem type="text" placeholder="请输入用户名" clear value={this.state.username} onChange={val=>this.handleChange('username',val)}>用户名</InputItem>
                        <InputItem type="password" placeholder="请输入密码" clear value={this.state.password} onChange={val=>this.handleChange('password',val)}>密码</InputItem>
                        <ListItem>
                            <span>用户类型</span>
                            <Radio checked={this.state.type==='dashen'} onChange={()=>this.handleChange('type','dashen')}>大神</Radio>
                            <Radio checked={this.state.type==='laoban'} onChange={()=>this.handleChange('type','laoban')}>老板</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={()=>this.props.history.replace('/register')}>立即注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>)
    }
}
export default Login