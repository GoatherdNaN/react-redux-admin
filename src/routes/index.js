import React from "react";
import {Route,BrowserRouter,Redirect} from 'react-router-dom';
import Login from '../containers/Login/index';
import Index from '../containers/App/index';
import AuthRoute from '../containers/Login/auth';
export default class Routers extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Route path="/login" component={Login}/>
                    <Redirect from='/' to='/index'/>
                    <AuthRoute path="/index" component={Index}/>
                </div>
            </BrowserRouter>
        )
    }
}
