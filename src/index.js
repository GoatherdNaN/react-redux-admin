import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import store from './store/index';
import Routers from "./routes/index";
import {AppContainer } from "react-hot-loader";
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
          <Routers/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);
if (module.hot) {
    module.hot.accept(()=> {
      ReactDOM.render(
          <Provider store={store}>
            <Routers/>
          </Provider>,
          document.getElementById('root')
      );
    });
}
