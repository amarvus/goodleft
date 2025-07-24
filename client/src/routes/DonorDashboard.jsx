import { useDispatch } from "react-redux";
import DonorFeed from "../components/DonorFeed";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URI } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const DonorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_URI + "/profile", {
        withCredentials: true,
      });

      dispatch(addUser(response.data));
    } catch (err) {
      if (err.status === 401) {
        // User is not authenticated, redirect to login
        return navigate("/login");
      }
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <DonorFeed />
    </div>
  );
};

export default DonorDashboard;
