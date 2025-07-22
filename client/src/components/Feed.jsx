import axios from "axios";
import { API_URI } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Foodcard from "./foodcard";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import RequestedFood from "./RequestedFood";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const response = await axios.get(API_URI + "/food/all", {
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
      <div>
        <div className="flex justify-end my-10 mx-20">
          <button
            className="btn btn-wide bg-gray-300"
            onClick={() => navigate("/requests")}
          >
            Requested Food
          </button>
        </div>
        <div className="flex justify-between mx-20 mt-10 mb-10">
          {feed.foodItems.map((item) => (
            <Foodcard key={item._id} food={item} />
          ))}
        </div>
      </div>
    )
  );
};

export default Feed;
