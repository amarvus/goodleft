import axios from "axios";
import { API_URI } from "../utils/constants";
import Foodcard from "./foodcard";
import DonorFoodCard from "./DonorFoodCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const DonorFeed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const response = await axios.get(API_URI + "/food/my", {
        withCredentials: true,
      });

      dispatch(addFeed(response.data));
    } catch (err) {
      console.error(err);
      alert("Unable to load feed");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return <h1 className="text-center my-10">No more food items found!</h1>;
  return (
    feed && (
      <>
        <div className="flex justify-end my-10 mx-20">
          <button
            className="btn btn-wide bg-gray-300"
            onClick={() => navigate("/food/create")}
          >
            Add Food
          </button>
        </div>
        <div className="flex justify-end my-10 mx-20">
          <button
            className="btn btn-wide bg-gray-300"
            onClick={() => navigate("/food/create")}
          >
            Received Request
          </button>
        </div>
        <div className="flex flex-wrap gap-6 justify-evenly mx-20 mt-10 mb-10">
          {feed.foodItems.map((item) => (
            <DonorFoodCard key={item._id} food={item} />
          ))}
        </div>
      </>
    )
  );
};

export default DonorFeed;
