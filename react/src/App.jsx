// src/App.js
import React from 'react';
import Data from './data';

function App() {
  const data = [
    { label: 'Item 1', value: 10 },
    { label: 'Item 2', value: 25 },
    { label: 'Item 3', value: 15 },
    // Add more data entries as needed
  ];
  return (
    <div className="App">
      <Data data={data}/>
    </div>
  );
}

export default App;
