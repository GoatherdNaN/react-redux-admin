import React from "react";
import style from './style.less';
import classnames from 'classnames';
export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {

    }
    render(){
      let {displayStatus} = this.props;
      return(
        <div className={classnames(style.spinner,style[`spinner${displayStatus}`])}>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
