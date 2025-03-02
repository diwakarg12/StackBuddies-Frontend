/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const sentConnectionSlice = createSlice({
    name: 'sentConnection',
    initialState: null,
    reducers: {
        addSentConnection: (state, action) => {
            return action.payload;
        },
        removeSentConnection: (state, action) => {
            return null;
        },
    },
});

export const { addSentConnection, removeSentConnection } = sentConnectionSlice.actions;
export default sentConnectionSlice.reducer;