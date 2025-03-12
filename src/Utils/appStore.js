import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import sentConnectionReducer from './sentConnectionSlice';
import receivedConnectionReducer from './receivedConnectionSlice';
import messageReducer from './messageSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        sentConnection: sentConnectionReducer,
        receivedConnection: receivedConnectionReducer,
        message: messageReducer 
    },
})

export default appStore;