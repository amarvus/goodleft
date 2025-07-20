import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccepterDashboard from "./routes/AccepterDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accepter-dashboard" element={<AccepterDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
