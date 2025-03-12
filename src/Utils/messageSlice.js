/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getSocket } from "../Socket/socket.client";

const messageSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        addMessages: (state, action) => {
            console.log('Action', action.payload);
            return [...state, {
                _id: action.payload._id || Date.now(), // Ensure _id is included
                sender: action.payload.sender || action.payload.user._id, // Ensure sender is included
                content: action.payload.content || action.payload.message, // Ensure content is included
                createdAt: action.payload.createdAt || new Date().toISOString(), // Ensure timestamp is included
            }];
        },
        setMessages: (state, action) => {
            return action.payload; // Replace the state with the new messages
        },
        removeMessages: (state, action) => {
            return state.filter(message => message._id !== action.payload); // Remove a message by ID
        },
    },
});

export const { addMessages, removeMessages, setMessages } = messageSlice.actions;

// Middleware for socket subscription
export const subscribeToMessages = () => (dispatch) => {
    const socket = getSocket();
    socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        dispatch(addMessages(message)); // Dispatch the new message to Redux
    });
};

export const unSubscribeFromMessages = () => (dispatch) => {
    const socket = getSocket();
    socket.off('newMessage'); // Unsubscribe from the event
};

export default messageSlice.reducer;