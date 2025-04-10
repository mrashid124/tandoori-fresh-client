import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";

const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(`http://localhost:5000/singleFood/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFood(data);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) return <Loader />;
  
    if (!food) {
      return <p className="text-center text-xl font-semibold">Food not found.</p>;
    }
  
    const { foodName, foodCategory, price, description, displayName, foodOrigin, photoURL, quantity } = food;
  
    return (
      <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
        <Helmet>
          <title>TandooriFresh | {foodName} Details</title>
        </Helmet>
  
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <img className="w-full h-80 lg:h-full object-cover" src={photoURL} alt={foodName} />
          </div>
          
          <div className="lg:w-2/3 p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{foodName}</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{description}</p>
            
            <div className="border-t border-gray-300 pt-4">
              <h2 className="text-xl font-semibold text-gray-800">Food Information</h2>
              <table className="w-full mt-2 text-gray-700">
                <tbody>
                  <tr><td className="py-2 font-medium">Category:</td><td>{foodCategory}</td></tr>
                  <tr><td className="py-2 font-medium">Origin:</td><td>{foodOrigin}</td></tr>
                  <tr><td className="py-2 font-medium">Chef:</td><td>{displayName}</td></tr>
                  <tr><td className="py-2 font-medium">Quantity:</td><td>{quantity}</td></tr>
                  <tr><td className="py-2 font-medium">Price:</td><td className="text-orange-600 font-semibold">${price}</td></tr>
                </tbody>
              </table>
            </div>
  
            <div className="mt-6">
              <Link to={`/foodpurchase/${id}`}>
                <button className="w-full bg-orange-600 hover:bg-orange-700 transition-all text-white font-semibold py-4 rounded-lg text-lg flex justify-center items-center gap-3">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Purchase Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FoodDetails;