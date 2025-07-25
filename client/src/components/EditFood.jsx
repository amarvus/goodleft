import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URI } from "../utils/constants";
import { useParams } from "react-router-dom";

const EditFood = () => {
  const { id: foodId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");

  const getFoodItem = async () => {
    try {
      const item = await axios.get(API_URI + "/get/food/" + foodId, {
        withCredentials: true,
      });
      const { name, description, quantity, expiry } = item.data.Item[0];

      setName(name || "");
      setDescription(description || "");
      setQuantity(quantity || "");
      setExpiry(expiry || "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFood = async () => {
    try {
      await axios.patch(
        API_URI + "/food/edit/" + foodId,
        { name, quantity, description, expiry },
        { withCredentials: true }
      );
      alert("Food updated successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to edit food");
    }
  };

  useEffect(() => {
    getFoodItem();
  }, []);

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
            <button
              className="btn btn-neutral btn-wide"
              onClick={handleEditFood}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFood;
