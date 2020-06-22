import { connect } from 'react-redux';
import { ProductList } from './ProductList';
import { createProduct, getProducts, updateProduct } from './actions/product'

const mapStateToProps = state => ({
    status: state.status,
    products: state.products.products
})

const mapDispatchToProps = {
    createProduct,
    getProducts,
    updateProduct
}

export const ProductListContainer = connect( mapStateToProps, mapDispatchToProps )(ProductList);

