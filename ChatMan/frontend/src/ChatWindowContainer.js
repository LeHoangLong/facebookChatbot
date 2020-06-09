import { connect } from 'react-redux';
import { ChatWindow } from './ChatWindow';
import { getPendingConversations } from './actions/conversation';

const mapStateToProps = state => ({
    status: state.status,
    pending_conversations: state.conversations.pending_conversations
})

const mapDispatchToProps = {
    getPendingConversations
}

export const ChatWindowContainer = connect(mapStateToProps, mapDispatchToProps)(ChatWindow);


