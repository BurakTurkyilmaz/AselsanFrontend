import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  currentUser: any; // currentUser'nin gerçek veri türüne uygun bir şey kullanmalısınız
}

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
