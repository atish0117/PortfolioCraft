import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { toast } from "react-toastify";

import { loadLayout } from "../customize/customizeSlice";

// 👤 Fetch full profile
export const fetchProfile = createAsyncThunk("profile/fetch", async (_, thunkAPI) => {
  try {
    const res = await API.get("/auth/me");
    // thunkAPI.dispatch(loadLayout()); // Load layout when profile is loaded
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch profile");
  }
});

// 🔄 Update Profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await API.put("/profile", formData);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg || "Update failed");
    }
  }
);

// 📄 Upload Resume
// export const updateResume = createAsyncThunk("profile/updateResume", async (formData, thunkAPI) => {
//   try {
//     const res = await API.put("/profile/resume", formData);
//     toast.success("Resume updated!");
//     return res.data.resumeUrl;
//   } catch (err) {
//     return thunkAPI.rejectWithValue("Resume upload failed");
//   }
// });


// 📤 Upload Resume
// export const uploadResume = createAsyncThunk(
//   "profile/uploadResume",
//   async (file, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       formData.append("resume", file);
//       const res = await API.post("/api/upload/resume", formData);
//       console.log(res.data.url)
//       return res.data.url;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.msg);
//     }
//   }
// );

// // 🖼️ Upload Profile Image
// export const uploadProfileImage = createAsyncThunk(
//   "profile/uploadImage",
//   async (file, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", file);
//       const res = await API.post("/api/upload/profile-image", formData);
//       return res.data.url;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.msg);
//     }
//   }
// );


// 🗣 Testimonials

export const addTestimonial = createAsyncThunk("profile/addTestimonial", async (data, thunkAPI) => {
  try {
    const res = await API.post("/profile/testimonials", data);
    toast.success("Testimonial added!");
    return res.data.testimonials;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to add testimonial");
  }
});

export const deleteTestimonial = createAsyncThunk("profile/deleteTestimonial", async (index, thunkAPI) => {
  try {
    const res = await API.delete(`/profile/testimonials/${index}`);
    toast.success("Testimonial deleted!");
    return res.data.testimonials;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to delete testimonial");
  }
});

// 🎓 Certifications
export const addCertification = createAsyncThunk("profile/addCertification", async (data, thunkAPI) => {
  try {
    const res = await API.post("/profile/certifications", data);
    toast.success("Certification added!");
    return res.data.certifications;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to add certification");
  }
});

export const deleteCertification = createAsyncThunk("profile/deleteCertification", async (index, thunkAPI) => {
  try {
    const res = await API.delete(`/profile/certifications/${index}`);
    toast.success("Certification deleted!");
    return res.data.certifications;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to delete certification");
  }
});

const initialState = {
  resumeUrl: "",
  profileImgUrl: null,
  user: null,
  profile: null,
  testimonials: [],
  certifications: [],
  sectionOrder: [],
  visibleSections: {},
  selectedTemplate: "minimal",
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        toast.success("Profile updated!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // .addCase(uploadResume.fulfilled, (state, action) => {
      //   state.resumeUrl = action.payload;
      // })
      // .addCase(uploadProfileImage.fulfilled, (state, action) => {
      //   state.profileImgUrl = action.payload;
      // })

      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials = action.payload;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = action.payload;
      })

      .addCase(addCertification.fulfilled, (state, action) => {
        state.certifications = action.payload;
      })
      .addCase(deleteCertification.fulfilled, (state, action) => {
        state.certifications = action.payload;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
