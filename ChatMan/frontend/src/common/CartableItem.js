import React, { Component } from 'react';
import '../common/reset.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import QuantityBox from '../common/QuantityBox';

class CartableItem extends Component {
    render() {
        return (
            <Card className="m-4 m-lg-5 h5_font_size" style={{ maxWidth:  this.props.img_width }}>
                <Card.Img width={ this.props.img_width } height={ this.props.img_height } variant='top' src={ this.props.item.img }></Card.Img>
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="h4_font_size font-weight-bold mt-2">
                        { this.props.item.name }
                    </Card.Title>
                    <Card.Text as='div' className="font-weight-light text-nowrap mt-2">
                        <div className="h6_font_size">
                            { this.props.item.price } { this.props.item.currency }
                        </div>
                        <div className="h7_font_size brief_text mt-2">
                            { this.props.item.description } 
                        </div>
                        <div className="h6_font_size font-weight-light mt-4 d-flex justify-content-center">
                            <div className="w-75">
                                <QuantityBox ref={elm => this.qty_box = elm} key={ this.counter++ } quantity={ this.props.quantity } onQuantityChanged={ quantity => this.props.onQuantityChanged(quantity) }></QuantityBox>
                            </div>
                        </div>
                        <div className="h6_font_size font-weight-light mt-4 pt-2 d-flex justify-content-center">
                            <button className="btn btn-success w-100 d-flex rounded-pill justify-content-center h6_font_size p-2" onClick={() => this.props.onAddToCart() }>
                                Add to cart
                            </button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

CartableItem.defaultProps = {
    img_width: 256,
    img_height: 256
}

export default CartableItem