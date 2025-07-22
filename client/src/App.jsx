import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccepterDashboard from "./routes/AccepterDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DonorDashboard from "./routes/DonorDashboard";
import RequestedFood from "./components/RequestedFood";
import Body from "./components/Body";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/accepter-dashboard" element={<AccepterDashboard />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/requests" element={<RequestedFood />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
