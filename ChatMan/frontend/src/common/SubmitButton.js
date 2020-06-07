import React, { Component } from 'react';

class SubmitButton extends Component {
    buttonClickHandler() {
        if (!this.props.disabled){
            this.props.onClick();
        }
    }

    showContent(){
        if (!this.props.disabled || this.props.alt === undefined){
            return this.props.children;
        }else{
            return this.props.alt;
        }
    }

    render(){
        return (
            <button disabled={ this.props.disabled } className={ this.props.className } onClick={() => this.buttonClickHandler() }>{ this.showContent() }</button>
        )
    }
}

export default SubmitButton;
