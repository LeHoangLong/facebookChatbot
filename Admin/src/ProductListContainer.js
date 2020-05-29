import { connect } from 'react-redux';
import { ProductList } from './ProductList';
import { createProduct } from './actions/product'

const mapStateToProps = state => ({
    status: state.status
})

const mapDispatchToProps = {
    createProduct
}

export const ProductListContainer = connect( mapStateToProps, mapDispatchToProps )(ProductList);

