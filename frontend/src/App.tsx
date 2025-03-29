import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./Pages/authentication/Authentication";
import Home from "./Pages/home/Home";
import { Toaster } from "sonner"; // Import Toaster

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Toaster position="top-center" richColors expand /> {/* Global Toaster */}
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
