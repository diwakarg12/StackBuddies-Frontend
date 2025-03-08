import { createSlice } from "@reduxjs/toolkit";

const receivedConnectionSlice = createSlice({
    name: 'receivedConnection',
    initialState: [],
    reducers: {
        addReceivedConection: (state, action) => {
            const existingConnection = state.find(req => req._id === action.payload._id);
            if (!existingConnection) {
                return [...state, action.payload];
            }
            return state;
        },
        removeReceivedConnection: (state, action) => {
            return state.filter(req => req._id !== action.payload);
        },
    },
});

export const { addReceivedConection, removeReceivedConnection } = receivedConnectionSlice.actions;
export default receivedConnectionSlice.reducer;