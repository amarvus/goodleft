import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URI } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ngo1@gmail.com");
  const [password, setPassword] = useState("Ngo1@123");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        API_URI + "/login",
        { email, password },
        { withCredentials: true }
      );
      //console.log(response.data.user);
      dispatch(addUser(response.data.user));
      let role = response.data.user.role;
      if (role === "donor") {
        navigate("/donor-dashboard");
      } else if (role === "accepter") {
        navigate("/accepter-dashboard");
      } else {
        alert("Invaid role");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-200 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-neutral btn-wide" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p
            className="m-auto pt-2 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            New User? Signup here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
