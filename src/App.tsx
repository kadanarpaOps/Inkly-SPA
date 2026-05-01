import { BrowserRouter as Router, Route, Routes } from "react-router";
import Auth from "./ui/pages/Auth/Login&Register";
import UserProvider from "./ui/context/providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
