import { BrowserRouter as Router, Route, Routes } from "react-router";
import Auth from "./ui/pages/Auth/Login&Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth/>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
