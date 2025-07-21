import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccepterDashboard from "./routes/AccepterDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AccepterDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
