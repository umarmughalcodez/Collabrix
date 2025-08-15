import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Register from "../components/Register"
import Homepage from "../components/Homepage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App