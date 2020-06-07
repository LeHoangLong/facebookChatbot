import React, { Component } from 'react'

class QuantityBox extends Component {
    render () {
        return (
            <div className="d-flex">
                <button onClick={event => {if (this.props.quantity > 0) this.props.onQuantityChanged(this.props.quantity - 1)}} className="fas fa-minus p-2 border_1px bg-white reduce_item_button no_outline">
                </button>
                <div className="flex-grow-1 d-flex justify-content-center align-items-center h6_font_size border_1px">
                    { this.props.quantity }
                </div>
                <button onClick={event => this.props.onQuantityChanged(this.props.quantity + 1)} className="fas fa-plus p-2 border_1px bg-white increase_item_button no_outline">
                </button>
            </div>
        )
    }
}

export default QuantityBox;
