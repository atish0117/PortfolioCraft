import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/projects/projectSlice";
import profileReducer from "../features/profile/profileSlice";
import customizeReducer from "../features/customize/customizeSlice";
import templateReducer from "../features/template/templateSlice";
import sectionReducer from "../features/sections/sectionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
      ui: uiReducer,
    projects: projectsReducer,
    profile: profileReducer,
      customize: customizeReducer,
      template: templateReducer,
        sections: sectionReducer,
  },
});
