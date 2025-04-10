import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopFoodsPage from "./TopFoodsPage";


const TopFoods = () => {
    const [foods, setFoods] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:5000/allfoods")
        .then((res) => res.json())
        .then((data) => {
          const sortedFoods = data.sort((a, b) => b.purchase_count - a.purchase_count);
          setFoods(sortedFoods.slice(0, 6));
        });
    }, []);
  
    return (
      <section className="w-full bg-white py-10 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2">
              {/* <Player
                autoplay
                loop
                src={fireAnimation}
                style={{ height: "50px", width: "50px" }}
              /> */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-play bg-gradient-to-r from-[#EA6A12] to-[#C75A0F] bg-clip-text text-transparent">
                Top Foods
              </h2>
            </div>
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
              Indulge in the finest flavors! These are the most loved dishes our customers keep coming back for — packed with bold spices, rich traditions, and culinary magic straight from our kitchen.
            </p>
          </div>
  
          {/* Top Foods Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <TopFoodsPage key={food._id} food={food} />
            ))}
          </div>
  
          {/* CTA Button */}
          <div className="mt-12 flex justify-center">
            <Link to="/allfoods">
              <button className="inline-flex items-center justify-center px-6 py-3 text-white text-base font-semibold rounded-md bg-[#EA6A12] hover:bg-[#C75A0F] transition duration-200 shadow-md">
                See All Foods
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  };
  
  export default TopFoods;