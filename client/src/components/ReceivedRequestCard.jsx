import axios from "axios";
import { API_URI } from "../utils/constants";

const ReceivedRequestCard = ({ requests }) => {
  const { accepter, food, status, _id } = requests;

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        API_URI + "/food/request/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      alert(`Food request ${status} successfully`);
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Unable to review request");
        console.error("Unexpected error:", err);
      }
    }
  };
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-4xl font-bold">{food.name}</h2>

          <p className="font-medium mt-2"> Status: {status} </p>
          <p className="font-medium">Quantity: {food.quantity}</p>
          <p className="font-medium">Expiry:{food.expiry} </p>
          <p className="font-medium">NGO: {accepter.name} </p>

          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary shadow-sm btn-wide"
              onClick={() => reviewRequest("accepted", _id)}
            >
              Accept
            </button>
            <button
              className="btn bg-red-400 shadow-sm btn-wide"
              onClick={() => reviewRequest("rejected", _id)}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedRequestCard;
