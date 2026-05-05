import { BrowserRouter as Router, Route, Routes } from "react-router";
import Auth from "./ui/pages/Auth/Login&Register";
import UserProvider from "./ui/context/providers/UserProvider";
import AuthLayout from "./ui/layouts/AuthLayout";
import MainLayout from "./ui/layouts/MainLayout";
import Profile from "./ui/pages/User/Profile";
import AuthProvider from "./ui/context/providers/AuthProvider";
import Library from "./ui/pages/User/Library";
import Write from "./ui/pages/User/Write";
import ExploreStories from "./ui/pages/Stories/ExploreStories";
import RecoveryPassword from "./ui/pages/Auth/RecoveryPassword";

function App() {
  return (
    <UserProvider>
      <AuthProvider>
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
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
