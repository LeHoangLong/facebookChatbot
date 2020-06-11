import { connect } from 'react-redux';
import { ChatWindow } from './ChatWindow';
import { getPendingConversations, getMessagesOfConversation, sendMessage } from './actions/conversation';

const mapStateToProps = state => ({
    status: state.status,
    pending_conversations: state.conversations.pending_conversations,
    messages: state.conversations.messages,
    sending_messages: state.conversations.sending_messages
})

const mapDispatchToProps = {
    getPendingConversations,
    getMessagesOfConversation,
    sendMessage
}

export const ChatWindowContainer = connect(mapStateToProps, mapDispatchToProps)(ChatWindow);


