import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: string;
}

const initialState: UserState = {
  user: "hi",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
