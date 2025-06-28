import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// 🔄 Add New Project
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData, thunkAPI) => {
    try {
      const res = await API.post("/projects", projectData);
      return res.data.project;
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
      const res = await API.get("/projects");
      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

// 🔄 Delete Project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      await API.delete(`/projects/${projectId}`);
      return projectId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

// 🔄 Update Project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await API.put(`/projects/${id}`, updatedData);
      return res.data.project;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.loading = false;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        );
      })

      // Update
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  }
});

export default projectSlice.reducer;
