import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePage = () => {
    const { id } = useParams();
    const [updateCard, setUpdateCard] = useState({});
  
    const {
      foodName,
      description,
      photoURL,
      foodCategory,
      quantity,
      price,
      foodOrigin,
    } = updateCard;
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    useEffect(() => {
      fetch(`http://localhost:5000/singleFood/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUpdateCard(data);
        });
    }, [id]);
  
    const onSubmit = (data) => {
      fetch(`http://localhost:5000/updateCard/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.modifiedCount) {
            Swal.fire({
              icon: "success",
              title: "Food Updated!",
              text: `${data.foodName} has been successfully updated.`,
              timer: 2000,
              showConfirmButton: false,
            });
            reset();
          }
        });
    };
  
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-20 pt-8 pb-16 mt-6 md:mt-10 rounded-lg bg-base-200 shadow-lg">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-play bg-gradient-to-r from-[#EA6A12] to-[#C75A0F] bg-clip-text text-transparent">
            Update: {foodName}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 opacity-80">
            Modify your food item information below. All fields are required.
          </p>
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block font-semibold mb-2 opacity-70">
                Food Name
              </label>
              <input
                defaultValue={foodName}
                {...register("foodName", { required: true })}
                className="input input-bordered w-full bg-base-100"
                placeholder="Enter food name"
              />
              {errors.foodName && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
  
            {/* Photo URL */}
            <div>
              <label className="block font-semibold mb-2 opacity-70">
                Photo URL
              </label>
              <input
                defaultValue={photoURL}
                {...register("photoURL", { required: true })}
                className="input input-bordered w-full bg-base-100"
                placeholder="Enter image URL"
              />
              {errors.photoURL && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
  
            {/* Category */}
            <div>
              <label className="block font-semibold mb-2 opacity-70">
                Food Category
              </label>
              <input
                defaultValue={foodCategory}
                {...register("foodCategory", { required: true })}
                className="input input-bordered w-full bg-base-100"
                placeholder="e.g. Starter, Dessert"
              />
              {errors.foodCategory && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
  
            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-2 opacity-70">Quantity</label>
              <input
                defaultValue={quantity}
                {...register("quantity", { required: true })}
                className="input input-bordered w-full bg-base-100"
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
  
            {/* Price */}
            <div>
              <label className="block font-semibold mb-2 opacity-70">Price ($)</label>
              <input
                defaultValue={price}
                {...register("price", { required: true })}
                className="input input-bordered w-full bg-base-100"
                placeholder="Enter price"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
  
            {/* Origin */}
            <div>
              <label className="block font-semibold mb-2 opacity-70">Food Origin</label>
              <input
                defaultValue={foodOrigin}
                {...register("foodOrigin", { required: true })}
                className="input input-bordered w-full bg-base-100"
                placeholder="Enter origin"
              />
              {errors.foodOrigin && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
          </div>
  
          {/* Description */}
          <div>
            <label className="block font-semibold mb-2 opacity-70">
              Short Description
            </label>
            <textarea
              defaultValue={description}
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full bg-base-100"
              placeholder="Enter a short description of the food"
              rows={4}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>
  
          {/* Submit Button */}
          <div className="text-center">
            <input
              type="submit"
              value="Update Food"
              className="btn bg-[#EA6A12] hover:bg-[#C75A0F] text-white text-lg font-semibold w-full md:w-1/2 mt-4"
            />
          </div>
        </form>
      </div>
    );
  };
  
  export default UpdatePage;