import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './common/style/frame.less'
import App2 from './App2'

import { Provider } from 'react-redux'
import store from './store'

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <App2 />
  </Provider>
)

// reportWebVitals();
