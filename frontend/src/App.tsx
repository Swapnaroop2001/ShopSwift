import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Authentication from "./Pages/authentication/Authentication";
import Home from "./Pages/home/Home";
import { Toaster } from "sonner"; 
import Navbar from "./components/ui/Navbar"; // Ensure correct path
import FullProfile from "./Pages/profile/FullProfile";
import Info from "./Pages/info/Info";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen w-full pb-16"> {/* Prevent overlap with Navbar */}
        <Toaster position="top-center" richColors expand /> {/* Global Toaster */}
        <Routes>
          {/* <Route path="/" element={<Authentication />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<FullProfile/>} />
          <Route path="/info" element={<Info/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
