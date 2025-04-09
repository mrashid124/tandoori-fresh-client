import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import AllFoodsPage from "../components/AllFoodsPage";



const AllFoods = () => {
    const [allFoodCards, setAllFoodCards] = useState([]);
    const [dataCount, setDataCount] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const cardPerPage = 6;
    const totalPage = Math.ceil(dataCount / cardPerPage);
    const pages = [...Array(totalPage).keys()].map((i) => i + 1);
  
    useEffect(() => {
      fetch(`http://localhost:5000/allFoodsForPagination?page=${currentPage}&size=${cardPerPage}&filter=${filter}&sort=${sort}&search=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setAllFoodCards(data);
          setLoading(false);
        });
    }, [currentPage, filter, sort, search]);
  
    useEffect(() => {
      fetch(`http://localhost:5000/allFoodsCont?filter=${filter}&search=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setDataCount(data.count);
          setLoading(false);
        });
    }, [filter, search]);
  
    const handleSearch = (e) => {
      e.preventDefault();
      setSearch(searchText);
    };
  
    const handleReset = () => {
      setFilter("");
      setSort("");
      setSearchText("");
    };
  
    if (loading) return <Loader />;
  
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8">
        <Helmet>
          <title>TandooriFresh | All Foods</title>
        </Helmet>
  
        <div className="bg-gradient-to-r from-red-700 to-orange-600 text-white py-12 rounded-xl text-center mb-10 shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Explore All Indian Foods</h1>
          <p className="text-lg font-light">Browse our curated list of mouthwatering Indian cuisines.</p>
        </div>
  
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 flex-wrap">
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
            <option value="Biryani">Biryani</option>
            <option value="Curry">Curry</option>
            <option value="Tandoori">Tandoori</option>
            <option value="Street Food">Street Food</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Snacks">Snacks</option>
            <option value="Dessert">Dessert</option>
          </select>
  
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search foods..."
              className="px-4 py-3 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Search
            </button>
          </form>
  
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
  
          <button
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFoodCards.map((food) => (
            <AllFoodsPage key={food._id} food={food} />
          ))}
        </div>
  
        <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-orange-500 hover:text-white disabled:opacity-50"
          >
            Previous
          </button>
  
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                page === currentPage ? "bg-orange-600 text-white" : "bg-gray-200 hover:bg-orange-500 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
  
          <button
            onClick={() => currentPage < totalPage && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPage}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-orange-500 hover:text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default AllFoods;