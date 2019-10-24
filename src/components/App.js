import React from 'react';

import Main from './Main'
import Login from './Login'
import Register from './Register'
import {HashRouter,Route,Switch} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../redux/actions'
function mapStateToProps(state) {
  console.log('mapStateToProps');
  console.log(state)
  return {
      list: state.handle
  }
}
console.log('Actions');
console.log(Actions);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
}
)

function App(props) {
  console.log(props);
  
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route  component={Main}/>
      </Switch>
  {/* <Button size="small" type="primary" onClick={handleCh}>antd</Button>     */}
    </HashRouter>
  );
}
const AppComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default AppComponent;
