const RequestCard = ({ requests }) => {
  const { food, status } = requests;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-4xl font-bold">{food.name}</h2>
          <p className="font-medium my-5">Staus: {status}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-error btn-wide">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
