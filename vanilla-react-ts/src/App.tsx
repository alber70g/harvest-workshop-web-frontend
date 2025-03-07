import React from 'react';
import './App.css';
import { Counter } from './components/Counter';
import { TrafficLight } from './components/TrafficLight';

/**
 * Counter
 *  - CounterComponent
 *  - Button up
 *  - Button down
 *  - Span count
 */

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
