import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// ✅ Testimonials CRUD

export const addTestimonial = createAsyncThunk(
  "portfolio/addTestimonial",
  async (testimonialData, thunkAPI) => {
    const res = await API.post("/profile/testimonial", testimonialData);
    return res.data.testimonials;
  }
);

export const deleteTestimonial = createAsyncThunk(
  "portfolio/deleteTestimonial",
  async (index, thunkAPI) => {
    const res = await API.delete(`/profile/testimonial/${index}`);
    return res.data.testimonials;
  }
);

// ✅ Certifications CRUD

export const addCertification = createAsyncThunk(
  "portfolio/addCertification",
  async (certData, thunkAPI) => {
    const res = await API.post("/profile/certification", certData);
    return res.data.certifications;
  }
);

export const deleteCertification = createAsyncThunk(
  "portfolio/deleteCertification",
  async (index, thunkAPI) => {
    const res = await API.delete(`/profile/certification/${index}`);
    return res.data.certifications;
  }
);

// ✅ Slice
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    testimonials: [],
    certifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // TESTIMONIALS
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials = action.payload;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = action.payload;
      })

      // CERTIFICATIONS
      .addCase(addCertification.fulfilled, (state, action) => {
        state.certifications = action.payload;
      })
      .addCase(deleteCertification.fulfilled, (state, action) => {
        state.certifications = action.payload;
      });
  },
});

export default portfolioSlice.reducer;