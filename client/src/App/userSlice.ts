import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../types/User.type";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      state.user = payload;
      console.log("user", state.user);
      
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;