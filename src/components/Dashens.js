/* eslint-disable */
import React from 'react'
import Cookies from 'js-cookies'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
function Cardx(props){
    return (
        <div>
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                <Card.Header
                    title={props.username}
                    onClick={()=>props.handleChat(props._id)}
                />
                <Card.Body>
                    <div>
                        <p>招聘职位:{props.post}</p>
                        <p>个人简介:{props.info}</p>
                       
                    </div>
                </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        </div>
    )
}
const Cards = withRouter(Cardx);
class Dashens extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            dashens:[{
                _id:'',
                username:'',
                post:'',
                info:''
            }]
        }
    }
    handleChat=(id)=>{
        this.props.history.push('./chat/'+id)
    }
    componentDidMount(){
        const userid = Cookies.getItem('userid').substring(3,27)
        axios.get('/dashen',{
            params:{
                type:'dashen'
            }
        }).then((data)=>{
            let arr = data.data.ret
            arr = arr.map((item,index)=>{
                item.id = index;
                return item;
            })
            arr = arr.filter((item)=>{
                if(item._id!==userid){      
                    return item
                }
            })
            this.setState({
                dashens: arr
            })  
        })
    }
    render(){
        console.log(this.state.dashens)
        return this.state.dashens.map((item,index)=>{
            return (<Cards handleChat={this.handleChat} key = {index} {...item} />)
        })
    }
}
export default Dashens
