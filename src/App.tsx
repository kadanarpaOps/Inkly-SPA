import { BrowserRouter as Router, Route, Routes } from "react-router";
import Login from "./ui/pages/Auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
