import axios from "axios";
import { API_URI } from "../utils/constants";

const RequestCard = ({ requests }) => {
  const { food, status, _id } = requests;

  const handleCancelRequest = async (requestId) => {
    try {
      axios.delete(API_URI + "/request/cancel/" + requestId, {
        withCredentials: true,
      });
      alert("Food request canceled");
    } catch (err) {
      console.log(requestId);

      console.error(err.message);
      alert("Unable to cancel request");
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-4xl font-bold">{food.name}</h2>
          <p className="font-medium my-5">Staus: {status}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-error btn-wide"
              onClick={() => {
                handleCancelRequest(_id);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
