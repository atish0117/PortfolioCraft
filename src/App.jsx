import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authSlice";

import TemplateSelector from "./components/TemplateSelector";
import TemplatePage from "./pages/TemplatePage";
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
  path="/dashboard"
  element={
    // <PrivateRoute>
      <Dashboard />
    // </PrivateRoute>
  }
/>
      <Route path="/projects" element={<Projects />} />
      <Route path="/select-template" element={<TemplateSelector />} />
      <Route path="/portfolio/:username" element={<TemplatePage />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
