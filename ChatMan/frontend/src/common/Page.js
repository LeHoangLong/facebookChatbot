import React, { Component } from 'react';
import '../common/common.css'

export class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            opacity: 0,
            display: 'none'
        }
        this.timer = setInterval(() => {
            if (this.props.currentPage === this.props.pageName){
                this.setState(state => {
                    let opacity;
                    if (state.opacity === 0){
                        opacity = 0.2;
                    }else{
                        opacity = state.opacity * 1.5;
                    }
                    if (opacity > 1){
                        opacity = 1;
                    }
                    let display = 'block';
                    return {
                        opacity: opacity,
                        display: display
                    }
                })
            }else{
                this.setState(state => {
                    return {
                        opacity: 0,
                        display: 'none'
                    }
                })
            }
        }, 50);
    }

    render() {
        var display = this.props.currentPage === this.props.pageName? this.state.display : 'none';
        var opacity = this.props.currentPage === this.props.pageName? '1': '0';
        return (
            <div style={{ width: '100%', height: '100%', display: display, opacity: this.state.opacity }}>
                { this.props.children }
            </div>
        )
    }
}

export default Page;
