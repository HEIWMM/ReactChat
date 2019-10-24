import React from 'react'
import { Button } from 'antd-mobile'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
class SocketT extends React.Component {
    componentDidMount() {
        socket.on('timer', data=>console.log('timer-->'+data));
        socket.emit('subscribeToTimer', 1000);
    }
    handleSocket = () => {
        socket.emit('some', 1000)
        console.log('handleSocket')
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleSocket}>click</Button>
            </div>)
    }

}
export default SocketT