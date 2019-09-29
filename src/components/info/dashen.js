import React from 'react'
import {connect} from 'react-redux'
import {update} from '../../redux/actions'
import Cookies from 'js-cookies'
import { List,NavBar, InputItem,  WingBlank, WhiteSpace, Button } from 'antd-mobile';
class DaShen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            post: '',
            info: ''
        }
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })//对象里面属性名如果是变量，就加一个[]
    }
    handleupdate=()=>{
        this.props.update(this.state)
    }
    render(){
        return (
        <div>
            <NavBar mode="light">
                大神 
            </NavBar>
            <List>
                <InputItem type="text" placeholder="请输入招聘职位" 
                clear value={this.state.post} 
                onChange={val => this.handleChange('post', val)}>招聘职位</InputItem>
                <InputItem type="text" placeholder="请输入个人信息" 
                clear value={this.state.info} 
                onChange={val => this.handleChange('info', val)}>个人信息</InputItem>
            </List> 
            <Button type="primary" onClick={this.handleupdate}>save</Button>
            <WhiteSpace/>
        </div>) 
    }
}
export default connect(
    state=>({data:state.user}),
    {update}
)(DaShen)