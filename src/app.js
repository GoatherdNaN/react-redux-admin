/**
 * Created by edlan on 3/27 0027.
 */
import React from "react";
import {Provider} from 'react-redux';
import {Route,BrowserRouter,Redirect} from 'react-router-dom';
import store from './store';
import Login from './containers/Login/index';
import Index from './containers/App/index';
import AuthRoute from './containers/Login/auth';
export default class Routers extends React.Component{
    render(){
        return <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route path="/login" component={Login}/>
                    <Redirect from='/' to='/index'/>
                    <AuthRoute path="/index" component={Index}/>
                </div>
            </BrowserRouter>
        </Provider>
    }
}
