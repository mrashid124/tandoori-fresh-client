import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import regImg from "../assets/Images/loginImg.png"; 
import useAuth from "../Hooks/useAuth";
import toast, { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location?.state || "/";
  const [showPassword, setShowPassword] = useState(false);
  const { createUserWithEmail, updateUser } = useAuth() || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;
    createUserWithEmail(email, password, toast)
      .then(() => {
        updateUser(name, photo);
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(redirectPath);
          });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${regImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
        <title>TandooriFresh | Register</title>
      </Helmet>

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Register</h2>
        <p className="text-center text-base opacity-80 mb-8">
          Create your TandooriFresh account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your full name"
              className="w-full input input-bordered bg-transparent placeholder:text-white"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">Full name is required</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
              className="w-full input input-bordered bg-transparent placeholder:text-white"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">Email is required</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 text-sm font-medium">Photo URL</label>
            <input
              {...register("photoURL", { required: true })}
              type="url"
              placeholder="Paste your photo URL"
              className="w-full input input-bordered bg-transparent placeholder:text-white"
            />
            {errors.photo && <p className="text-red-400 text-sm mt-1">Photo URL is required</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full input input-bordered bg-transparent placeholder:text-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-lg opacity-70 hover:opacity-100"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full bg-[#EA6A12] border-none text-white hover:bg-orange-600 text-lg font-semibold"
          >
            Create Account
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#EA6A12] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;



