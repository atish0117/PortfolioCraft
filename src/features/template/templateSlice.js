import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// 🔄 Update Template
export const updateTemplate = createAsyncThunk(
  "template/update",
  async (templateId, thunkAPI) => {
    try {
      const res = await API.put("/profile/template", { selectedTemplate: templateId });
      return res.data.selectedTemplate;
    } catch (err) {
      return thunkAPI.rejectWithValue("Template update failed");
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState: {
    selected: "minimal",
    loading: false,
    error: null,
  },
  reducers: {
    setTemplate: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setTemplate } = templateSlice.actions;
export default templateSlice.reducer;
