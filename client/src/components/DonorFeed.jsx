import axios from "axios";
import { API_URI } from "../utils/constants";
import Foodcard from "./foodcard";
import DonorFoodCard from "./DonorFoodCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const DonorFeed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const response = await axios.get(API_URI + "/food/my", {
        withCredentials: true,
      });
      console.log(response.data);
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
        <div className="flex justify-between mx-20 mt-10 mb-10">
          {feed.foodItems.map((item) => (
            <DonorFoodCard key={item._id} food={item} />
          ))}
        </div>
      </>
    )
  );
};

export default DonorFeed;
