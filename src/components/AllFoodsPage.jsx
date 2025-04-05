import { Link } from "react-router-dom";
import PropTypes from "prop-types";




const AllFoodsPage = ({ food }) => {
    const { _id, foodName, foodCategory, price, quantity, photoURL } = food || {};
    const oldPrice = (parseFloat(price) + 9.99).toFixed(2);
  
    return (
      <div>
        <div className="card card-compact bg-[#FAF3E0] shadow-lg border border-[#8B4513] h-full">
          <figure className="overflow-hidden">
            <img className="transition-transform duration-300 hover:scale-105" src={photoURL} alt={foodName} />
          </figure>
          <div className="card-body">
            <h2 className="text-3xl font-bold mt-3 font-play text-[#8B4513]">{foodName}</h2>
            <p className="text-lg font-medium text-[#A0522D]">{foodCategory}</p>
            <p className="flex gap-4 text-lg font-medium">
              <span className="text-[#C1440E] font-semibold">$ {price}</span>
              <span className="text-gray-500 line-through">$ {oldPrice}</span>
            </p>
            <p className="text-lg font-semibold text-[#8B4513]">Quantity: {quantity}</p>
            <div className="card-actions">
              <Link to={`/details/${_id}`}>
                <button className="btn bg-[#C1440E] text-white hover:bg-[#A13609]">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  AllFoodsPage.propTypes = {
    food: PropTypes.object.isRequired,
  };
  
  export default AllFoodsPage;