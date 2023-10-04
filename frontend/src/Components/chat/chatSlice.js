import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
    currentChat: null,
    messages: [],
    newMessage: "",
    arrivalMessage: {}
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations: (state, action) => { state.conversations = action.payload },
        setCurrentChat: (state, action) => { state.currentChat = action.payload },
        setMessages: (state, action) => { state.messages = action.payload },
        setNewMessage: (state, action) => { state.newMessage = action.payload },
        setArrivalMessage: (state, action) => { state.arrivalMessage = action.payload },
        addNewMessage:(state, action) => { state.messages.push(action.payload) },
        addConversation:(state, action) => { state.conversations.push(action.payload) },
        resetState: () => {
            return initialState;
        }
    }
});

const {actions, reducer} = chatSlice;

export default reducer;
export const {
    setConversations,
    setCurrentChat,
    setMessages,
    setNewMessage,
    addNewMessage,
    setArrivalMessage,
    addConversation,
    resetState
} = actions;