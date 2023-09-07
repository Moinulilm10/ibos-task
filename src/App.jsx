import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Pages/Signup";
import { Home } from "./components/Pages/Home";
import { Login } from "./components/Pages/Login";
import { UserProfile } from "./components/Pages/UserProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
