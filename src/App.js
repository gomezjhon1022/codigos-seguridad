import React from 'react';
import { UseState } from './UseState.js';
import { UseReducer } from './UseReducer.js'


function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
