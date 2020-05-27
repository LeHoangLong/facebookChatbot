import Page from './Page'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    currentPage: state.page.current_page
})

const PageContainer = connect(mapStateToProps, null, null, { forwardRef: true })(Page)
export default PageContainer;
