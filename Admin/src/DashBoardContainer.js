import { connect } from 'react-redux';
import { DashBoard } from './DashBoard';
import { checkIfLoggedIn } from './actions/product'
import { goToPage, setTokenExpiry, setToken, getCsrfToken } from './actions/index'


const mapStateToProps = state => ({
    status: state.status,
    tokens: state.tokens,
    current_page: state.page.current_page
})

const mapDispatchToProps = {
    checkIfLoggedIn,
    getCsrfToken,
    setToken,
    setTokenExpiry,
    goToPage
}

export const DashBoardContainer = connect(mapStateToProps, mapDispatchToProps)(DashBoard);


