import React from "react";
import bannerImg from "/images/home/wokonfire.png";
import {useNavigate} from 'react-router-dom';



const Banner = () => {
  const navigate=useNavigate();

  const handleOrderNowClick = () => {
    navigate('/menu');
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">

        {/* img */}
        <div className="md:w-2/3">
          <img src={bannerImg} alt="" />
          
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
        <h2 className="md:text-5xl text-black text-4xl font-bold md:leading-snug leading-snug pt-20">
            Dive into Delights Of Delectable Food
          </h2>
          <p className="text-[#4A4A4A] text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full" onClick={handleOrderNowClick}>
            Order Now
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
