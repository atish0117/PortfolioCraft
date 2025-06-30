import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// 🌀 Async Thunk - Load layout on profile fetch
export const loadLayout = createAsyncThunk(
  "customize/loadLayout",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/profile");
      return {
        sectionOrder: res.data.user.sectionOrder,
        visibleSections: res.data.user.visibleSections,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load layout");
    }
  }
);

// 💾 Async Thunk - Save layout to backend
export const saveLayout = createAsyncThunk(
  "customize/saveLayout",
  async ({ sectionOrder, visibleSections }, thunkAPI) => {
    try {
      const res = await API.put("/user/layout", { sectionOrder, visibleSections });
      return res.data.layout;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to save layout");
    }
  }
);

// 🧩 Section Keys (Fixed)
const sectionKeys = [
  "hero",
  "skills",
  "projects",
  "education",
  "experience",
  "certifications",
  "testimonials",
  "contact",
];

// 🧠 Initial Redux State
const initialState = {
  sectionOrder: [...sectionKeys],
  visibleSections: sectionKeys.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {}),
  status: "idle",
  error: null,
};

// 🧾 Slice
const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    setSectionOrder: (state, action) => {
      state.sectionOrder = action.payload;
    },
    toggleSectionVisibility: (state, action) => {
      const key = action.payload;
      state.visibleSections[key] = !state.visibleSections[key];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLayout.fulfilled, (state, action) => {
        state.sectionOrder = action.payload.sectionOrder;
        state.visibleSections = action.payload.visibleSections;
      })
      .addCase(saveLayout.fulfilled, (state, action) => {
        state.sectionOrder = action.payload.sectionOrder;
        state.visibleSections = action.payload.visibleSections;
      });
  },
});

// 🏁 Export
export const { setSectionOrder, toggleSectionVisibility } = customizeSlice.actions;
export default customizeSlice.reducer;
