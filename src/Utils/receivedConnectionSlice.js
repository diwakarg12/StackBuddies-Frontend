/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const receivedConnectionSlice = createSlice({
    name: 'receivedConnection',
    initialState: null,
    reducers: {
        addReceivedConection: (state, action) => {
            return action.payload;
        },
        removeReceivedConnection: (state, action) => {
            return null;
        },
    },
});

export const { addReceivedConection, removeReceivedConnection } = receivedConnectionSlice.actions;
export default receivedConnectionSlice.reducer;