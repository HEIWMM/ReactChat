import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
function Cardx(props){
    console.log(props.id);
    return (
        <div>
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                <Card.Header
                    title={props.username}
                />
                <Card.Body>
                    <div>
                        <p>招聘职位:{props.post}</p>
                        <p>个人简介:{props.info}</p>
                        <p>公司名字:{props.company}</p>
                        <p>详细工资:{props.salary}</p>
                    </div>
                </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        </div>
    )
}
class Laobans extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            laobans:[{
                username:'',
                post:'',
                info:'',
                company:'',
                salary:'',
            }]
        }
    }
    componentDidMount(){
        axios.get('/laoban',{
            params:{
                type:'laoban'
            }
        }).then((data)=>{
            let arr = data.data.ret
            arr = arr.map((item,index)=>{
                item.id = index;
                return item;
            })
            this.setState({
                laobans: arr
            })  
        })
    }
    render(){
        return this.state.laobans.map((item,index)=>{
            return (<Cardx key = {index} {...item}/>)
        })
    }
}
export default Laobans