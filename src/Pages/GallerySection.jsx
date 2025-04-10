


import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import galleryImg from '../assets/Images/galleryImage.jpg'
import GalleryPage from "../components/GalleryPage";

const GallerySection = () => {
    const { user } = useAuth() || {};
    const { displayName } = user || {};
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      const newData = { ...data, displayName };
      fetch("http://localhost:5000/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added to gallery!",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
          }
        });
    };
  
    useEffect(() => {
      fetch("http://localhost:5000/gallery")
        .then((res) => res.json())
        .then((data) => {
          setGalleryData(data);
          setLoading(false);
        });
    }, []);
  
    if (loading) return <Loader />;
  
    return (
      <div className="mb-16">
        <Helmet>
          <title>TandooriFresh | Gallery</title>
        </Helmet>
  
        {/* Banner Section */}
        <div
          className="text-center py-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${galleryImg})`,
          }}
        >
          <h1 className="text-4xl font-bold text-white">Gallery</h1>
          <div className="flex justify-center mt-2">
            <ul className="text-sm text-white breadcrumbs">
              <li><Link to="/">Home</Link></li>
              <li><span>Gallery</span></li>
            </ul>
          </div>
        </div>
  
        {/* Add Button & Modal */}
        <div className="container mx-auto px-4 mt-10">
          <div className="flex justify-end">
            {user ? (
              <label htmlFor="add_modal" className="btn bg-[#EA6A12] hover:bg-[#C75A0F] text-white">
                Add New
              </label>
            ) : (
              <Link to="/login">
                <button className="btn bg-gray-400 text-white">Login to Add</button>
              </Link>
            )}
          </div>
  
          {/* Modal */}
          <input type="checkbox" id="add_modal" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box bg-[#F9F8F4] text-left">
              <h3 className="text-xl font-semibold mb-4">Add to Gallery</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={displayName}
                      readOnly
                      className="input w-full bg-white border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Feedback</label>
                    <input
                      type="text"
                      {...register("Feedback", { required: true })}
                      placeholder="Write your feedback"
                      className="input w-full bg-white border px-3 py-2"
                    />
                    {errors.Feedback && (
                      <span className="text-red-600 text-sm">Feedback is required</span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block font-medium mb-1">Image URL</label>
                  <input
                    type="url"
                    {...register("PhotoURL", { required: true })}
                    placeholder="Paste image URL"
                    className="input w-full bg-white border px-3 py-2"
                  />
                  {errors.PhotoURL && (
                    <span className="text-red-600 text-sm">Image URL is required</span>
                  )}
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn w-full mt-6 bg-[#EA6A12] hover:bg-[#C75A0F] text-white font-semibold"
                />
              </form>
              <div className="modal-action">
                <label htmlFor="add_modal" className="btn">Close</label>
              </div>
            </div>
          </div>
  
          {/* Gallery Grid */}
          <div className="grid gap-6 mt-10 lg:grid-cols-3 sm:grid-cols-2">
            {galleryData.map((item) => (
              <GalleryPage key={item._id} data={item} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default GallerySection;