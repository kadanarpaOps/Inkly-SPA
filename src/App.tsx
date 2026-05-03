import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router";
import Auth from "./ui/pages/Auth/Login&Register";
import UserProvider from "./ui/context/providers/UserProvider";

function App() {

  const location = useLocation();

  return (
    <UserProvider>
      <Routes>
        <Route path="/auth" element={<Auth key={location.key} />}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
