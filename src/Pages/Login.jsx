import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import loginImg from '../assets/Images/loginImg.png'



const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, googleSignUP} = useAuth() || {};
  const [isHide, setIsHide] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleHide = () => setIsHide(!isHide);

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
        });
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 text-white"
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
        <title>TandooriFresh | Login</title>
      </Helmet>

      <div className="w-full max-w-xl p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/10">
        <h2 className="text-3xl font-extrabold mb-2 text-center">Login</h2>
        <p className="text-sm text-center opacity-80 mb-8">
          Welcome back! Log in to continue ordering.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              type={isHide ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            <button
              type="button"
              onClick={handleHide}
              className="absolute top-9 right-4 text-white hover:text-orange-300"
            >
              <span className="material-symbols-outlined text-lg">
                {isHide ? "visibility_off" : "visibility"}
              </span>
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
          </div>

          <p className="text-right text-sm font-medium text-orange-300 hover:underline cursor-pointer">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-400 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>

        <div className="divider text-white mt-8">OR</div>

        <div className="flex justify-center flex-wrap gap-4 mt-6">
          <button
            onClick={googleSignUP}
            className="btn btn-outline text-white hover:bg-orange-500"
          >
            <img src="/google.png" alt="Google" className="w-6 h-6 mr-2" />
            Google
          </button>
          {/* <button
            onClick={githubSignUP}
            className="btn btn-outline text-white hover:bg-orange-500"
          >
            <img src="/github.png" alt="GitHub" className="w-6 h-6 mr-2" />
            GitHub
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
