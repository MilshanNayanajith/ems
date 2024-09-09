import { configureStore } from "@reduxjs/toolkit";
import customAlert from './features/custom-alert/customAlert';
import loading from './features/global/loading';

export const store = configureStore({
    reducer:{
        customAlert:customAlert,
        loading:loading
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;