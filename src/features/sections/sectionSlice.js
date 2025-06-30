import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// 🔄 Update Section Settings (visibility + order)
export const updateSectionSettings = createAsyncThunk(
  "sections/updateSettings",
  async ({ visibleSections, sectionOrder }, thunkAPI) => {
    try {
      const res = await API.put("/profile/section-settings", {
        visibleSections,
        sectionOrder,
      });
      return {
        visibleSections: res.data.user.visibleSections,
        sectionOrder: res.data.user.sectionOrder,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Section update failed");
    }
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    visibleSections: {
      hero: true,
      skills: true,
      projects: true,
      education: true,
      experience: true,
      certifications: true,
      testimonials: true,
      contact: true,
    },
    sectionOrder: [
      "hero",
      "skills",
      "projects",
      "education",
      "experience",
      "certifications",
      "testimonials",
      "contact",
    ],
    loading: false,
    error: null,
  },
  reducers: {
    toggleSection: (state, action) => {
      const section = action.payload;
      state.visibleSections[section] = !state.visibleSections[section];
    },
    reorderSections: (state, action) => {
      state.sectionOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSectionSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSectionSettings.fulfilled, (state, action) => {
        state.visibleSections = action.payload.visibleSections;
        state.sectionOrder = action.payload.sectionOrder;
        state.loading = false;
      })
      .addCase(updateSectionSettings.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { toggleSection, reorderSections } = sectionSlice.actions;
export default sectionSlice.reducer;
