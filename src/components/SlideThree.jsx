import React from 'react';
import bgImg3 from '../assets/Images/slide3.jpg';
import { Link } from 'react-router-dom';
const SlideThree = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bgImg3})` }}>
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h2 className="mb-5 text-4xl font-bold">Welcome to</h2>
                <h2 className="mb-5 text-7xl font-bold ">Party Zone</h2>
                <p className="mb-5 text-sm">HOME OF THE  DELICIOUS FOOD</p>
                <Link to='/allfoods'><Button className="btn bg-orange-600 text-white w-full hover:bg-orange-700">Explore Food</Button></Link>
            </div>
        </div>
    </div>
    );
};

export default SlideThree;