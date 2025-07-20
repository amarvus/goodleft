import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-200 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input type="text" className="input" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" />
          </fieldset>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-neutral btn-wide">Login</button>
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
