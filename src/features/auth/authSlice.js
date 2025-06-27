import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Register
export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const res = await axios.post("/api/auth/register", formData, { withCredentials: true });
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

// 🔄 Login
export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await axios.post("/api/auth/login", formData, { withCredentials: true });
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

// 🔄 Get Current User
export const getCurrentUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/auth/me", { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Not logged in");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
