import React, { Component } from 'react';
import TickBox from '../common/TickBox'
import QuantityBox from '../common/QuantityBox'

class CartItem extends Component {
    render() {
        return(
            <div className="d-flex pl-3">
                <div className="d-flex pl-2 pr-2 align-items-center">
                    <TickBox selected={ this.props.selected } onClick={() => this.props.onSelectToggle()}></TickBox>
                </div>
                <img src={ this.props.item.dish_image } height="100" width="100"></img>
                <div className="flex-grow-1 d-flex flex-column ml-3">
                    <div className="dish_name h6_font_size font-weight-bold"></div>
                    <div className="h7_font_size">
                        <span>Number: { this.props.item.dish_number} </span>
                    </div>
                    <div className="h7_font_size font-weight-bold text-danger">
                        { this.props.item.dish_price } {this.props.item.currency}
                    </div>
                    <div className="h6_font_size mt-3 pr-3 w-75">
                        <QuantityBox quantity={ this.props.quantity } onQuantityChanged={quantity => this.props.onQuantityChanged(quantity)}></QuantityBox>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartItem;
