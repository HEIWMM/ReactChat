import React from 'react' 
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import LaoBanInFo from './info/laoban'
import DaShenInFo from './info/dashen'
import LaoBan from './Laobans'
class Main extends React.Component{
    render(){
        return (
        <div>
            <Switch>
                <Route path='/dasheninfo' component={DaShenInFo}/>    
                <Route path='/laobaninfo' component={LaoBanInFo}/>    
                <Route path='/laobans' component={LaoBan}/>    
            </Switch>    
        </div>)
    }
}
export default Main