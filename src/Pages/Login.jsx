import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { PiEyeBold, PiEyeSlashFill } from "react-icons/pi";


const Login = () => {
  const { loginUser, googlePopup } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill all fields.", { position: "top-center" });
      return;
    }

    try {
      await loginUser(email, password);
      toast.success("Login successful!", { position: "top-center" });
      setTimeout(() => navigate(from === "/" ? "/allfoods" : from, { replace: true }), 1000);
    } catch (err) {
      toast.error("Login failed. Check your email or password.", { position: "top-center" });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googlePopup();
      toast.success("Logged in with Google!", { position: "top-center" });
      setTimeout(() => navigate(from === "/" ? "/allfoods" : from, { replace: true }), 1500);
    } catch (err) {
      toast.error("Google sign-in failed.", { position: "top-center" });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF3E0] px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-[#8B4513]">
        <h2 className="text-[#C1440E] text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col">
          <label htmlFor="email" className="text-[#8B4513] font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#C1440E] w-full"
          />

          <label htmlFor="password" className="text-[#8B4513] font-medium mt-4 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#C1440E] w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-700"
            >
              {passwordVisible ? <PiEyeSlashFill /> : <PiEyeBold />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#C1440E] text-white py-3 rounded-lg font-bold hover:bg-[#A13609] transition duration-300 w-full mt-6"
          >
            Login
          </button>

          <p className="text-[#8B4513] border-t mt-4 pt-3 text-center font-medium">
            OR LOGIN WITH
          </p>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-500 transition duration-300 mt-3 flex items-center justify-center gap-2 w-full"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>

          <p className="text-[#8B4513] text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#C1440E] font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
