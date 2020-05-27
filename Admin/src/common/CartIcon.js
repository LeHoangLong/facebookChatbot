import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './CartIcon.css'

class CartIcon extends Component {
    render() {
        return(
            <div className="fas fa-shopping-cart h5_font_size position-relative">
                <div className="notification text-center h7_font_size text-white">
                    { this.props.numOfItems }
                </div>
            </div>
        )
    }
}

export default CartIcon;