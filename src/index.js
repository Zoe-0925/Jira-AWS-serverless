import React from "react";
import ReactDOM from 'react-dom';
/**   Router    */
import history from './history';
/**    Redux     */
import { Provider, ReactReduxContext } from 'react-redux';
import configureStore from './Reducers/store';
/**     Pages     */
import App from './App';
/**     Fonts    */
import './assets/fonts/Montserrat/Montserrat-Regular.ttf';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <App history={history} context={ReactReduxContext} />
  </Provider>,
  document.getElementById('root')
);



