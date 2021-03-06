import React from 'react'
import {hashHistory,Link} from 'react-router'
import './style.less'
class DetailHeader extends React.Component {

    handleBack = () => {
        window.history.back();
    }

    render (){
        const {title,btn} =this.props;
        return (
            <div className="back-header detail">
                <div className="back-container">
                    <i className="icon-arrow-left2" onClick={this.handleBack}>
                    </i>
                </div>
                <span className="back-title">{title?title:null}</span>
                {
                    btn&&<Link to="/subscribe/home" className="back-btn">完成</Link>
                }
            </div>

        )
    }
}

export default DetailHeader;