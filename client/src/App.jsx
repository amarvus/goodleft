import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccepterDashboard from "./routes/AccepterDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DonorDashboard from "./routes/DonorDashboard";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accepter-dashboard" element={<AccepterDashboard />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
