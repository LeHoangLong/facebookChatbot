import React, { Component } from 'react';

class GoBackIcon extends Component {
    render(){
        return(
            <button className="fas fa-arrow-left border-0 bg-light" onClick={() => this.props.goBackPage() }></button>
        )
    }
}

export default GoBackIcon;
