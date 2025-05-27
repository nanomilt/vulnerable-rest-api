import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let div; // Defining the variable 'div' as it was undefined

it('renders without crashing', () => {
  div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});