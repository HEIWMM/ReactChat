import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import App from './components/App'

import store from './redux/store'
// import  './test/socketio_test.js'
//const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)




