/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getSocket } from "../Socket/socket.client";
import toast from "react-hot-toast";

const connectionSlice = createSlice({
    name: 'conection',
    initialState: [],
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removeConnection: (state, action) => {
            return null;
        },

        subscribeToNewConnection: (state, action) => {
            try {
                const socket = getSocket();

                socket.on("newConnection", (newMatch) => {
                    const existingConnection = state.find(req => req._id === action.payload._id);
                    if (!existingConnection) {
                        return [...state, action.payload]
                    }
                    toast.success("You got a new connection!");
                });
            } catch (error) {
                console.log(error);
            }
        },

        unsubscribeFromNewConnection: () => {
            try {
                const socket = getSocket();
                socket.off("newConnection");
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export const { addConnection, removeConnection, subscribeToNewConnection, unsubscribeFromNewConnection } = connectionSlice.actions
export default connectionSlice.reducer;