import { connect } from 'react-redux';
import { DashBoard } from './DashBoard';
import { checkIfLoggedIn } from './actions/product'
import { setTokenExpiry, setToken, getCsrfToken } from './actions/token'


const mapStateToProps = state => ({
    status: state.status,
    tokens: state.tokens
})

const mapDispatchToProps = {
    checkIfLoggedIn,
    getCsrfToken,
    setToken,
    setTokenExpiry
}

export const DashBoardContainer = connect(mapStateToProps, mapDispatchToProps)(DashBoard);


