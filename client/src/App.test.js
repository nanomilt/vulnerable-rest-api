import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// This code block is a test case for the React application
// It checks if the App component renders without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});