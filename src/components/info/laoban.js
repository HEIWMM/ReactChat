import React from 'react'
import {connect} from 'react-redux'
import {update} from '../../redux/actions'
import Cookies from 'js-cookies'
import { List,NavBar, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
class LaoBan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            post: '',
            info: '',
            company: '',
            salary: '',
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
                老板 
            </NavBar>
            <List>
                <InputItem type="text" placeholder="请输入招聘职位" 
                clear value={this.state.post} 
                onChange={val => this.handleChange('post', val)}>招聘职位</InputItem>
                <InputItem type="text" placeholder="请输入公司名称" 
                clear value={this.state.company} 
                onChange={val => this.handleChange('company', val)}>公司名称</InputItem>
                <InputItem type="text" placeholder="请输入职位薪资" 
                clear value={this.state.salary} 
                onChange={val => this.handleChange('salary', val)}>职位薪资</InputItem>
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
)(LaoBan)