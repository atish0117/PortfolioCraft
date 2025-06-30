import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// 🔄 Add New Project
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData, thunkAPI) => {
    try {
      const res = await API.post("/profile/projects", projectData);
       toast.success("Project added");
      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

// 🔄 Get All User Projects
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/me");
      return res.data.projects || [] ;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data?.msg);
    }
  }
);

// 🔄 Delete Project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      await API.delete(`/profile/projects/${projectId}`);
       toast.success("Project deleted");
        return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data?.msg);
    }
  }
);

// 🔄 Update Project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await API.put(`/profile/projects/${id}`, updatedData);
       toast.success("Project updated");
      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data?.msg);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
  // ⏳ Loading
      .addCase(addProject.pending, (state) => { state.loading = true; })
      .addCase(deleteProject.pending, (state) => { state.loading = true; })
      .addCase(updateProject.pending, (state) => { state.loading = true; })
      .addCase(getProjects.pending, (state) => { state.loading = true; })

      // ✅ Success
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // ❌ Failure
      .addMatcher(
        (action) => action.type.startsWith("projects/") && action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  }
});

export default projectSlice.reducer;
