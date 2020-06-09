import { connect } from 'react-redux';
import { ChatWindow } from './ChatWindow';

const mapStateToProps = state => ({
    status: state.status
})

export const ChatWindowContainer = connect(mapStateToProps)(ChatWindow);


