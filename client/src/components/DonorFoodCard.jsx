const DonorFoodCard = ({ food }) => {
  const { name, quantity, expiry, description } = food;

  const handleEdit = async () => {
    // patch
  };

  const handleDelete = async () => {
    // delete
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
            <button className="btn btn-primary shadow-sm btn-wide">Edit</button>
            <button className="btn bg-red-400 shadow-sm btn-wide">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorFoodCard;
