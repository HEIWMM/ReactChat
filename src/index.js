import React from 'react'
import { render } from 'react-dom'
import { createStore,bindActionCreators } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './redux/reducers'
import store from './redux/store'
//const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)




