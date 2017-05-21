import React from "react";
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Index extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        let {auth,component:Component} = this.props;
        return(
            <Route render={props=>(
                auth ? (
                    <Component {...props}/>
                ):(
                    <Redirect to={{
                        pathname:"login",
                        state:{
                            from:props.location
                        }
                    }}/>
                )
            )}/>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth:state.global.get("auth")
    }
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Index)
