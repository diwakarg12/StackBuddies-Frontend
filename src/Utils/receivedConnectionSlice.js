import { createSlice } from "@reduxjs/toolkit";

const receivedConnectionSlice = createSlice({
    name: 'receivedConnection',
    initialState: [],
    reducers: {
        addReceivedConection: (state, action) => {
            return action.payload;
        },
        removeReceivedConnection: (state, action) => {
            const newArr = state.filter(req => req._id !== action.payload);
            return newArr;
        },
    },
});

export const { addReceivedConection, removeReceivedConnection } = receivedConnectionSlice.actions;
export default receivedConnectionSlice.reducer;