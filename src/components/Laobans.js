/* eslint-disable */
import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import Cookies from 'js-cookies'
import { withRouter } from 'react-router-dom'
function Cardx(props) {
    return (
        <div>
            
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header
                        title={props.username}
                        onClick={() => props.handleChat(props._id)}
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
         
        </div>
    )
}
const Cards = withRouter(Cardx);
class Laobans extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            laobans: [{
                _id: '',
                username: '',
                post: '',
                info: '',
                company: '',
                salary: '',
            }],
            test: []
        }
    }
    handleChat = (id) => {
        this.props.history.push('./chat/' + id)
    }
    componentDidMount() {
        const userid = Cookies.getItem('userid').substring(3, 27)
        console.log(userid)
        axios.get('/laoban', {
            params: {
                type: 'laoban'
            }
        }).then((data) => {
            let arr = data.data.ret

            arr = arr.map((item, index) => {
                item.id = index;
                return item;
            })
            arr = arr.filter((item) => {
                if (item._id !== userid) {
                    return item
                }
            })
            this.setState({
                laobans: arr
            })
        })
    }
    render() {
        console.log(this.state.laobans)
        return (
            <WingBlank style={{marginBottom:'50px'}}>
            {this.state.laobans.map((item, index) => {
                return (<Cards handleChat={this.handleChat} key={index} {...item} />)
            })}
            </WingBlank>
        )
    }
}
export default Laobans