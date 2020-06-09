import { connect } from 'react-redux';
import { DashBoard } from './DashBoard';
import { checkIfLoggedIn, logIn } from './actions/login'
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
    goToPage,
    logIn
}

export const DashBoardContainer = connect(mapStateToProps, mapDispatchToProps)(DashBoard);


