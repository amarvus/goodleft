import axios from "axios";
import React, { useEffect } from "react";
import { API_URI } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/receivedRequestSlice";
import ReceivedRequestCard from "./ReceivedRequestCard";

const ReceivedRequest = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.receivedRequests);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(API_URI + "/food/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data));
    } catch (err) {
      console.error(err);
      alert("Unable to load requests");
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  return (
    requests && (
      <div className="flex flex-wrap gap-6 justify-evenly my-10 mx-20">
        {requests.foodRequests.map((item) => (
          <ReceivedRequestCard key={item._id} requests={item} />
        ))}
      </div>
    )
  );
};

export default ReceivedRequest;
