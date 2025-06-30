// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // 🔄 Register
// export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
//   try {
//     const res = await axios.post("/api/auth/register", formData, { withCredentials: true });
//     return res.data.user;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.msg);
//   }
// });

// // 🔄 Login
// export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
//   try {
//     const res = await axios.post("/api/auth/login", formData, { withCredentials: true });
//     return res.data.user;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.msg);
//   }
// });

// // 🔄 Get Current User
// export const getCurrentUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
//   try {
//     const res = await axios.get("/api/auth/me", { withCredentials: true });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue("Not logged in");
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api"; // 👈 Axios instance with credentials
import { toast } from "react-toastify";

// 🔄 Register
export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const res = await API.post("/auth/register", formData);
    toast.success("Registered successfully!");
    return res.data.user;
  } catch (err) {
    const message = err.response?.data?.msg || "Registration failed";
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// 🔄 Login
export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await API.post("/auth/login", formData);
    toast.success("Login successful!");
    return res.data.user;
  } catch (err) {
    const message = err.response?.data?.msg || "Login failed";
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// 🔄 Get Current User
export const getCurrentUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await API.get("/auth/me");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Not logged in");
  }
});


// 🔄 Profile Update Thunk
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await API.put("/profile", formData); // Axios auto handles cookie/token
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg || "Update failed");
    }
  }
);

        // updateTemplate    
// export const updateSelectedTemplate = createAsyncThunk(
//   "auth/updateTemplate",
//   async (templateId, thunkAPI) => {
//     try {
//       const res = await API.put("/profile/template", { selectedTemplate: templateId });
//       return res.data.user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.msg);
//     }
//   }
// );

    //Update Section Settings
export const updateSectionSettings = createAsyncThunk(
  "auth/updateSectionSettings",
  async ({ sectionOrder, visibleSections }, thunkAPI) => {
    try {
      const res = await API.put("/profile/section-settings", {
        sectionOrder,
        visibleSections
      });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || "Failed");
    }
  }
);




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
      toast.success("Logged out successfully!");
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
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

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // GET USER
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.loading = false;
      })
        // UPDATE USER
        .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

