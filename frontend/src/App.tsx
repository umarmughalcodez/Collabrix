import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import Homepage from "../components/Homepage";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}>
            Login
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
