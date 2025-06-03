import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Violation #1: ESLINT_no-undef on line 5
// This rule can help you locate potential ReferenceErrors resulting from misspellings of variable and parameter names, or accidental implicit globals.
// Good Example: globally declared a, let foo = someFunction(); let bar = a + 1;
// Bad Example: let boo = yourFunction(); let tab = a + 1;

// Fixing the violation by declaring the variable 'it' and defining it as a function
const it = (_, callback) => callback();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});