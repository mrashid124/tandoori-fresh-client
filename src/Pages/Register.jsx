import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { PiEyeBold, PiEyeSlashFill } from "react-icons/pi";


const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | TandooriFresh";
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", { position: "top-center" });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.", { position: "top-center" });
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.", { position: "top-center" });
      return;
    }

    try {
      await createUser(email, password, name, photo);
      toast.success("Registration Successful!", { position: "top-center" });
      
      setTimeout(() => navigate("/allfoods"), 1500);
    } catch (error) {
      toast.error(error.message || "Registration failed.", { position: "top-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF3E0] px-4">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-[#8B4513]">
        <h2 className="text-[#C1440E] text-3xl font-bold text-center mb-2">
          Join TandooriFresh
        </h2>
        <p className="text-[#8B4513] text-center mb-6">Create your account to explore the best flavors!</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[#8B4513] font-medium">Name</label>
            <input 
              type="text" 
              name="name" 
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C1440E]" 
              placeholder="Enter your name" 
              required 
            />
          </div>
          <div>
            <label className="block text-[#8B4513] font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C1440E]" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <label className="block text-[#8B4513] font-medium">Photo URL</label>
            <input 
              type="text" 
              name="photo" 
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C1440E]" 
              placeholder="Enter your photo URL" 
            />
          </div>
          <div>
            <label className="block text-[#8B4513] font-medium">Password</label>
            <div className="relative">
              <input 
                type={passwordVisible ? "text" : "password"} 
                name="password" 
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C1440E]" 
                placeholder="Create a password" 
                required 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-700"
              >
                {passwordVisible ? <PiEyeSlashFill /> : <PiEyeBold />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#C1440E] text-white py-3 rounded-lg font-bold hover:bg-[#A13609] transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-[#8B4513] text-sm mt-4">
          Already have an account? 
          <Link to="/login" className="text-[#C1440E] font-semibold ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

