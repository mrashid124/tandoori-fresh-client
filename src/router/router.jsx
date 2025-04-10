import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import MainLayout from "../layout/MainLayout";
import Navbar from "../components/Navbar";
import AllFoods from "../Pages/AllFoods";
import GallerySection from "../Pages/GallerySection";
import UpdatePage from "../components/UpdatePage";
import FoodDetails from "../Pages/FoodDetails";

// import '';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      // element: <Login></Login>,

      errorElement: <h2>Route not found.</h2>,
      children: [
        {
          index: true,
            element: <Home></Home>,
            // loader: () => fetch('http://localhost:5000/allfoods')
        },
        {
          path: "/allfoods",
          // element: <h2>AllFoods</h2>,
          element: <AllFoods></AllFoods>,
        },

        {
          path: "/gallery",
          element: <GallerySection></GallerySection>,
        },
        {
          path: "/details/:id",
          element: <FoodDetails></FoodDetails>,
        
        },
        {
          path: "/addfood",
          element: <h2> Add food component</h2>,

          // element: (
          //   <PrivetRoute>
          //     <AddFood></AddFood>
          //   </PrivetRoute>
          // ),
        },
        {
          path: "/update/:id",
          element: <UpdatePage></UpdatePage>,
          // element: (
          //   <PrivetRoute>
          //     <UpdateCard></UpdateCard>
          //   </PrivetRoute>
          // ),
        },
        {
          path: "/myaddedfoods",
          element: <h2> My added foods component</h2>,
          // element: (
          //   <PrivetRoute>
          //     <MyAddedFoods></MyAddedFoods>
          //   </PrivetRoute>
          // ),
        },
        {
          path: "/updateprofile",
          element: <h2> Update Profile component</h2>,
          // element: (
          //   <PrivetRoute>
          //     <UpdateProfile></UpdateProfile>
          //   </PrivetRoute>
          // ),
        },
        {
          path: "/login",
          // element: <h2> Login component</h2>,
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
