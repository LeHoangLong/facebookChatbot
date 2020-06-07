import GoBackIcon from '../common/GoBackIcon'
import { connect } from 'react-redux'
import { goBackPage } from '../actions'

const mapDispatchToProps = {
    goBackPage
}

const GoBackIconContainer = connect(null, mapDispatchToProps)(GoBackIcon)
export default GoBackIconContainer;
