import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        API_URI + "/signup",
        { name, role, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to signup. Please try again.");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-200 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium">Sign Up</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Fullname</legend>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Role</legend>
            <input
              type="text"
              className="input"
              list="roles"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <datalist id="roles">
              <option value="donor"></option>
              <option value="accepter"></option>
            </datalist>
          </fieldset>
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
            <button className="btn btn-neutral btn-wide" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
          <p
            className="m-auto pt-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Existing User? Login here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
