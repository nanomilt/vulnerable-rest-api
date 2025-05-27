import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let a; // globally declared a

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  let foo = someFunction();
  let bar = a + 1;
});