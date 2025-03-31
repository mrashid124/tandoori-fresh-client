import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MainLayout from "../layout/Mainlayout";
// import '';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,

      errorElement: <h2>Route not found.</h2>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
      ]
    },
  ]);
  export default router;