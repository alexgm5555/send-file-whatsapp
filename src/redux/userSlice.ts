import { createSlice } from '@reduxjs/toolkit';

export interface UserInterface {
  phone: string,
  message?: string,
}

const initialState: UserInterface = {
  phone: '',
  message: ''
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPhone: (state, action) => {
      const { phone } = action.payload;
      state.phone = phone;
    },
  }
});

export const {
  addPhone
} = userSlice.actions;
export default userSlice.reducer;
