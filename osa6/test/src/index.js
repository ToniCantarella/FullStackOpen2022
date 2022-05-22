/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
); */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/reducer'
import './index.css'

const store = createStore(counterReducer)

function App() {
  

  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button onClick={e => store.dispatch({type: 'INCREMENT'})}>plus</button>
      <button onClick={e => store.dispatch({type: 'DECREMENT'})}>minus</button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>zero</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)


