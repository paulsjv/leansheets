import React from 'react';
import ReactDOM from 'react-dom';
import {render, act} from '@testing-library/react'
import App from './App';

// https://github.com/testing-library/jest-dom
// https://github.com/testing-library/react-testing-library
// https://github.com/facebook/react/issues/5465#issuecomment-157888325 Cancel Promise
// https://medium.com/trabe/avoid-updates-on-unmounted-react-components-2fbadab17ad2 more on Cancel Promise

it('renders without crashing', () => {
  // const div = document.createElement('div');
  act(() => {
    const {getByLabelText, getByText, findByRole} = render(<App />)
  })
  // ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
})
