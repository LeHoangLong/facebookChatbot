import { connect } from 'react-redux';
import { ChatWindow } from './ChatWindow';
import { closeConversation, getPendingConversations, getMessagesOfConversation, sendMessage, joinConversation, getConversations } from './actions/conversation';

const mapStateToProps = state => ({
    status: state.status,
    pending_conversations: state.conversations.pending_conversations,
    conversations: state.conversations.conversations,
    messages: state.conversations.messages,
    sending_messages: state.conversations.sending_messages
})

const mapDispatchToProps = {
    getPendingConversations,
    getMessagesOfConversation,
    sendMessage,
    joinConversation,
    getConversations,
    closeConversation
}

export const ChatWindowContainer = connect(mapStateToProps, mapDispatchToProps)(ChatWindow);


