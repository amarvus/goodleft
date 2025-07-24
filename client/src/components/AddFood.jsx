import axios from "axios";
import { API_URI } from "../utils/constants";
import { useState } from "react";

const AddFood = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [description, setDescription] = useState("");

  const handleFood = async () => {
    try {
      await axios.post(
        API_URI + "/food/create",
        { name, description, quantity, expiry },
        { withCredentials: true }
      );
      alert("Food item added successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to add food");
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-200 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium"></h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Quantity</legend>
            <input
              type="text"
              className="input"
              placeholder="2, 3, ..."
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Expiry</legend>
            <input
              type="text"
              className="input"
              placeholder="yy-mm-dd"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-neutral btn-wide" onClick={handleFood}>
              Add Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
