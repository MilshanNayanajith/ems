import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {alert:{message:string, type:string} | null} = {
   alert:null
};

const customAlertSlice = createSlice({
  name: "customAlert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<any>) => {
        state.alert = action.payload;
        
    },
    clearAlert: (state) => {
      state.alert = null;
    },

  },
});

export const { setAlert, clearAlert } = customAlertSlice.actions;
export default customAlertSlice.reducer;
