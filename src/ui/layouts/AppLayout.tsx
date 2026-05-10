import { BrowserRouter as Router, Route, Routes } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "./AuthLayout";
import Auth from "../pages/Auth/Login&Register";
import MainLayout from "./MainLayout";
import ExploreStories from "../pages/Stories/ExploreStories";
import { Library } from "lucide-react";
import Write from "../pages/User/Write";
import Profile from "../pages/User/Profile";
import CreateStory from "../pages/Stories/CreateStory";
import LandingPage from "../pages/LandingPage";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { setupAxiosResponseInterceptor } from "../../infrastructure/api/config/axios.instance";

const AppLayout = () => {

  const { authUser, logout, validateAccess, validateSession, refreshSession } = useAuth();

  useEffect(() => {
    setupAxiosResponseInterceptor(
        authUser,
        validateAccess,
        validateSession,
        refreshSession,
        () => {
            logout();
        }
    )
  });

  return (
        <Router>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/auth" element={<Auth />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/explore" element={<ExploreStories />} />
              <Route path="/library" element={<Library />} />
              <Route path="/write" element={<Write />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/story/create" element={<CreateStory />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<ErrorPage statusCode={404} messageError="Página no encontrada" />} />
          </Routes>
        </Router>
  )
}

export default AppLayout;
    