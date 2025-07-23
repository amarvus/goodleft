import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { API_URI } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import Foodcard from "../components/foodcard";
import Feed from "../components/feed";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_URI + "/profile", {
        withCredentials: true,
      });

      dispatch(addUser(response.data));
    } catch (err) {
      if (err.status === 400) {
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
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
