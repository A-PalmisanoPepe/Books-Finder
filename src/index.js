import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import mobileNavbarReducer from './reducers/mobileNavbarState';

const store = createStore(mobileNavbarReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);