import {configureStore} from '@reduxjs/toolkit';
import  authSlice  from './slices/atuhSlice';
import turnSlice  from './slices/turnSlice';
const store = configureStore({
    reducer: {
        auth: authSlice,
        turn: turnSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});     

export default store;