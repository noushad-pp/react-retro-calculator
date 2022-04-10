import { inspect } from '@xstate/inspect';
import React from 'react';
import ReactDOM from 'react-dom';

import RetroCalculator from './application/RetroCalculator';
import reportWebVitals from './reportWebVitals';

import './index.scss';

// X-State visualiser
inspect({
  iframe: false,
});

ReactDOM.render(
  <React.StrictMode>
    <RetroCalculator />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
