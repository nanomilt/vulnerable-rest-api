// Import React and ReactDOM modules
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Define a function to test rendering without crashing
function it(description, callback) {
  callback();
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});