import { BrowserRouter as Router, Route, Routes } from "react-router";
import ErrorPage from "../pages/errors/ErrorPage";
import AuthLayout from "./AuthLayout";
import Auth from "../pages/Auth/Login&Register";
import MainLayout from "./MainLayout";
import ExploreStories from "../pages/Stories/ExploreStories";
import { Library } from "lucide-react";
import Write from "../pages/User/Write";
import Profile from "../pages/User/Profile";
import CreateStory from "../pages/Stories/CreateStory";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { setupAxiosResponseInterceptor } from "../../infrastructure/api/config/axios.instance";
import StoryDetails from "../pages/Stories/StoryDetails";
import EditStory from "../pages/Stories/EditStory";
import LandingPage from "../pages/landing/LandingPage";
import RecoveryPassword from "../pages/Auth/RecoveryPassword";

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
              <Route path="/recovery-pass" element={<RecoveryPassword />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/explore" element={<ExploreStories />} />
              <Route path="/library" element={<Library />} />
              <Route path="/write" element={<Write />} />
              <Route path="/profile" element={<Profile />} />
              {/** Stories */}
              <Route path="/explore/story/:storyId" element={<StoryDetails />} />
              <Route path="/story/edit/:storyId" element={<EditStory />} />
            </Route>
            <Route path="/story/create" element={<CreateStory />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/forbidden" element={<ErrorPage statusCode={403} messageError="No tienes Permisos para explorar por aquí..." />} />
            <Route path="/network-lost" element={<ErrorPage statusCode={500} messageError="Regálanos unos minutos en lo que se restaura la conexión..." />} />
            <Route path="*" element={<ErrorPage statusCode={404} messageError="Página no encontrada" />} />
          </Routes>
        </Router>
  )
}

export default AppLayout;
    