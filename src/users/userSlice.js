import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userApi";

const initialState = {
  value: 0,
  status: "idle",
  userInfo: [],
  error: null,
};

export const getAllUserAsync = createAsyncThunk(
  "user/getusers",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getAllUser(userData);
      // Assuming your API response contains a `data` property
      return response.data;
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error fetching user data:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(getAllUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const selectUsers = (state) => state.user.userInfo;
export const selectUsersError = (state) => state.user.error;

export default userSlice.reducer;
