import axios from "axios";
import { API_URI } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(API_URI + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to logout");
    }
  };
  return (
    user && (
      <div>
        <div className="navbar bg-base-100 shadow-md">
          <div className="flex-1">
            <Link
              to={
                user.role == "accepter"
                  ? "/accepter-dashboard"
                  : "/donor-dashboard"
              }
              className="btn btn-ghost text-xl"
            >
              Good Left
            </Link>
          </div>
          <div className="flex gap-2 mx-4">
            <div className="dropdown dropdown-end">
              <div className="flex items-center">
                <div className="mx-5 text-md font-medium">
                  Welcome, {user.name}
                </div>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    />
                  </div>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
