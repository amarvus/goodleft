import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../utils/constants";

const DonorFoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { name, quantity, expiry, description, _id } = food;

  const handleDelete = async () => {
    try {
      await axios.delete(API_URI + "/food/delete/" + _id, {
        withCredentials: true,
      });
      alert("Food item deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to delete");
    }
  };
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-4xl font-bold">{name}</h2>

          <p className="font-medium mt-2">{description}</p>
          <p className="font-medium">Quantity: {quantity} </p>
          <p className="font-medium">Expiry: {expiry}</p>

          <div className="card-actions justify-center mt-3">
            <button
              className="btn btn-primary shadow-sm btn-wide"
              onClick={() => navigate(`/food/edit/${_id}`)}
            >
              Edit
            </button>
            <button
              className="btn bg-red-400 shadow-sm btn-wide"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorFoodCard;
