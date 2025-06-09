import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let div; // Declaring the variable 'div' to avoid the 'no-undef' violation

it('renders without crashing', () => {
  div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});