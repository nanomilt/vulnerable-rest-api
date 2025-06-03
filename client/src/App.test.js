// FIXED_CODE

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let div; // Declaring 'div' to fix the violation

it('renders without crashing', () => {
  div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});