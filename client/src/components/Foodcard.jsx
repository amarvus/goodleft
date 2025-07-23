import axios from "axios";
import { API_URI } from "../utils/constants";

const Foodcard = ({ food }) => {
  const { name, quantity, expiry, description, donor, _id } = food;

  const handleRequest = async (foodId) => {
    try {
      await axios.post(
        API_URI + "/request/send/" + foodId,
        {},
        { withCredentials: true }
      );
      alert("Food request sent successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to send food request");
    }
  };
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-4xl font-bold">{name}</h2>

          <p className="font-medium mt-2">{description}</p>
          <p className="font-medium">Quantity: {quantity}</p>
          <p className="font-medium">Expiry: {expiry}</p>
          <hr></hr>
          <p className="font-medium text-lg">Restaurant: {donor.name}</p>

          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary shadow-sm btn-wide"
              onClick={() => {
                handleRequest(_id);
              }}
            >
              Request Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
