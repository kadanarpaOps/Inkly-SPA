import { BrowserRouter as Router, Route, Routes } from "react-router";
import ErrorPage from "../pages/errors/ErrorPage";
import AuthLayout from "./AuthLayout";
import Auth from "../pages/Auth/Login&Register";
import MainLayout from "./MainLayout";
import ExploreStories from "../pages/Stories/ExploreStories";
import Write from "../pages/User/Write";
import Profile from "../pages/User/Profile";
import UserInfo from "../pages/User/UserInfo.tsx";
import CreateStory from "../pages/Stories/CreateStory";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { setupAxiosResponseInterceptor } from "../../infrastructure/api/config/axios.instance";
import StoryDetails from "../pages/Stories/StoryDetails";
import EditStory from "../pages/Stories/EditStory";
import LandingPage from "../pages/landing/LandingPage";
import RecoveryPassword from "../pages/Auth/RecoveryPassword";
import { ProtectedRoute } from "../../infrastructure/routes/routes.control";
import Library from "../pages/User/Library";
import Users from "../pages/Users/Users";

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
              {/** Stories */}
              <Route path="/explore/story/:storyId" element={<StoryDetails />} />
              <Route path="/explore" element={<ExploreStories />} />
              {/** Secured */}
              <Route element={<ProtectedRoute requiredRoles={["INKLY_USER"]} />}>
                <Route path="/library" element={<Library />} />
                <Route path="/write" element={<Write />} />
                <Route path="/story/edit/:storyId" element={<EditStory />} />
              </Route>
              {/* User Insecured */}
              <Route path="/user/:userId" element={<UserInfo />} />
              <Route path="/users" element={<Users />} />
              <Route element={<ProtectedRoute requiredRoles={[]} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute requiredRoles={["INKLY_USER"]} />}>
              <Route path="/story/create" element={<CreateStory />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/forbidden" element={<ErrorPage statusCode={403} messageError="No tienes Permisos para explorar por aquí..." />} />
            <Route path="/unauthorized" element={<ErrorPage statusCode={220} messageError="Error 220 Teclado Elevado, bailemos!!" />} />
            <Route path="/network-lost" element={<ErrorPage statusCode={500} messageError="Regálanos unos minutos en lo que se restaura la conexión..." />} />
            <Route path="*" element={<ErrorPage statusCode={404} messageError="Página no encontrada" />} />
          </Routes>
        </Router>
  )
}

export default AppLayout;
    