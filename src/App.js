import React from 'react';
import {Button} from 'antd-mobile'
import {Sth} from './components/sth'
import 'antd-mobile/dist/antd-mobile.css';

function App() {
  return (
    <div className="App">
      <Button size="small" type="primary">antd</Button>
      <p>Hello</p>
      <Sth/>
    </div>
  );
}

export default App;
