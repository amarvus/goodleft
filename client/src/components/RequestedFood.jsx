import axios from "axios";
import { API_URI } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import Navbar from "./Navbar";
import RequestCard from "./RequestCard";

const RequestedFood = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(API_URI + "/request/my", {
        withCredentials: true,
      });

      dispatch(addRequest(response.data));
    } catch (err) {
      console.error(err);
      alert("Unable to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.requests.length === 0)
    return <h1 className="text-center my-10">No Requests Found!</h1>;

  return (
    <div className="flex flex-wrap gap-6 justify-evenly my-10 mx-20">
      {requests.requests.map((request) => (
        <RequestCard key={request._id} requests={request} />
      ))}
    </div>
  );
};

export default RequestedFood;
