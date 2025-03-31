import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../Footer';

const MainLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (isLoading) {
      return <Loader></Loader>;
    }
    return (
        <div>

        {/* <Toaster></Toaster> */}
          <nav>
            <Navbar></Navbar>
          </nav>
          <main className="min-h-screen">
            <Outlet></Outlet>
          </main>
          <div>
            <Footer></Footer>
          </div>
      </div>
    );
};

export default MainLayout;