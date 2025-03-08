import { createSlice } from "@reduxjs/toolkit";

const sentConnectionSlice = createSlice({
    name: 'sentConnection',
    initialState: [],
    reducers: {
        addSentConnection: (state, action) => {
            const existingConnection = state.find(req => req._id === action.payload._id);
            if (!existingConnection) {
                return [...state, action.payload];
            }
            return state;
        },
        removeSentConnection: (state, action) => {
            return state.filter(req => req._id !== action.payload);
        },
    },
});

export const { addSentConnection, removeSentConnection } = sentConnectionSlice.actions;
export default sentConnectionSlice.reducer;