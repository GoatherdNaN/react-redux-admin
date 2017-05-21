/**
 * Created by edlan on 3/23 0023.
 */
import React from 'react';
import ReactDOM from "react-dom";
import App from "./app";
import {AppContainer } from "react-hot-loader";
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};
render(App);
if (module.hot) {
    module.hot.accept(()=> {
        render(App)
    });
}