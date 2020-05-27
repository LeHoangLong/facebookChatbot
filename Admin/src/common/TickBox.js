import React, { Component } from 'react';
import '../common/reset.css'

class TickBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            display: props.selected === true? 'inline' : 'none'
        }
    }
    static getDerivedStateFromProps(props, state){
        return {
            display: props.selected === true? 'inline' : 'none'
        }
    }

    render() {
        return (
            <div className="far fa-square h5_font_size position-relative" onClick={() => {if (this.props.onClick !== undefined) this.props.onClick()}}>
                <div className="absolute_left_edge fas fa-check-square text-secondary" style={ { display: this.state.display } }></div>
            </div>
        )
    }
}
export default TickBox;