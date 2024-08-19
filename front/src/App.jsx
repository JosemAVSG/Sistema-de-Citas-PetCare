import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Error404 from "./views/Error404";
import Myturns from "./views/Myturns";
import Login from "./views/Login";
import Register from "./views/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import TurnsForm from "./components/TurnsForm";
import Profile from "./components/Profile";
import About from "./views/About";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About/>} />
          <Route path="/*" element={<Error404 />} />
          <Route element={<ProtectedRoute />}>
          <Route  path="/profile" element={<Profile/>} />
            <Route path="/myturns" element={<Myturns />} />
            <Route path="/turnForm" element={<TurnsForm />} />
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
