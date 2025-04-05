import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
// import useAuth from "../Hooks/useAuth";

const Navbar = () => {
    // const { user, logOut } = useAuth();
    const { user, logOut } = useContext(AuthContext);
    const normalLink = "lg:font-bold lg:text-lg lg:mr-2 mt-2 lg:mt-0 text-[#8B4513] hover:text-[#E7B10A]";
    const activeLink = `bg-[#E7B10A] text-[#FFFFFF] border-none hover:bg-transparent focus:bg-transparent focus:text-[#E7B10A] ${normalLink}`;
    return (
      <div className="sticky top-0 z-40 bg-[#F5E6CC] shadow-xl ">
        <div className="navbar bg-[#F5E6CC] container mx-auto p-4 ">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className=" menu menu-sm dropdown-content mt-3 z-[11] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allfoods"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    All Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    Gallery
                  </NavLink>
                </li>
                {user ? (
                  <li className="md:hidden">
                    <button
                      onClick={logOut}
                      className="btn mt-4 bg-[#C1440E] text-white font-bold hover:bg-[#A13609]"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <div className="mt-4">
                    <Link to="/login">
                      <button className="btn bg-[#C1440E] text-white font-bold hover:bg-[#A13609]">
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </ul>
            </div>
            <Link
              to="/"
              className="btn btn-ghost md:text-3xl text-xl font-play text-[#C1440E]"
            >
              TandooriFresh
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allfoods"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  All Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Gallery
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end flex ">
            {user ? (
              <div className=" flex justify-center gap-2 pr-2 md:pr-0">
                <div className="dropdown dropdown-end mt-1">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-30 rounded-full">
                      <img
                        alt="User Avatar"
                        src={
                          user.photoURL || "https://i.ibb.co/4SrK9pD/profile.jpg"
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/myaddedfoods">My added food Items</Link>
                    </li>
                    <li>
                      <Link to="/addfood">Add a food item</Link>
                    </li>
                    <li>
                      <Link to="/myorder">My ordered Food Items</Link>
                    </li>
                    <li>
                      <Link to="/updateprofile">Update Profile</Link>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={logOut}
                  className="btn mt-1 bg-[#C1440E] text-white font-bold hover:bg-[#A13609] hidden md:flex"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex">
                <div>
                  <Link to="/login">
                    <button className="btn bg-[#C1440E] hover:bg-[#A13609] text-white font-bold">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Navbar;
