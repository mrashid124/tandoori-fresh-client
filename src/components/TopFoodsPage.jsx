import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TopFoodsPage = ({ food }) => {
  const { _id, foodName, foodCategory, price, photoURL } = food || {};
  const oldPrice = parseFloat(price) + 6.99;
  const slicedOldPrice = parseFloat(oldPrice.toFixed(2).toString().slice(0, 5));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="h-56 overflow-hidden">
        <img
          src={photoURL}
          alt={foodName}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#EA6A12] to-[#C75A0F]">
          {foodName}
        </h2>

        <p className="text-gray-600 font-medium">{foodCategory}</p>

        <div className="flex items-center gap-4 text-lg font-semibold text-gray-800">
          <span className="text-orange-600">${price}</span>
          <span className="text-red-400 line-through">${slicedOldPrice}</span>
        </div>

        <div className="pt-4">
          <Link to={`/details/${_id}`}>
            <button className="w-full bg-[#EA6A12] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#C75A0F] transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

TopFoodsPage.propTypes = {
  food: PropTypes.object.isRequired,
};

export default TopFoodsPage;