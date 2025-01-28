import React from 'react';
import LogoCarousel from './LogoCarousel.jsx';
import Preview from './Preview.jsx'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (

    <div className="items-center justify-center h-screen overflow-y-scroll">
      <div className="flex h-28"></div>

      <div className="flex flex-col justify-center items-center">
        <div className="-mb-4">
          <span className="font-main font-semibold text-[4.5rem] mr-4 dark:text-white2 tracking-tighter">
            Social Media
          </span>
          <span className="font-main font-semibold text-[4.5rem] text-Primary tracking-tighter">
            Networking
          </span>
        </div>

        <div className="">
          <span className="font-main font-semibold text-[4.5rem] mr-4 text-Primary tracking-tighter">
            Platform
          </span>
          <span className="font-main font-semibold text-[4.5rem] dark:text-white2 tracking-tighter" >
            for Trading Skills
          </span>
        </div>

        <div className="mt-2 w-[45%] text-center">
          <span className="font-main text-gray text-md leading items-center justify-center dark:text-darkWhite">
            Skillswap offers the perfect blend of opportunities, serving as a social media platform for skill trading where you can explore without any associated costs.
          </span>
        </div>

        <div className="w-full mt-8 items-center justify-center flex gap-4">
          <Link to='/auth'>
            <button className="bg-Primary rounded-lg px-4 py-2 text-white shadow-2xl shadow-Primary">
                <span className="font-main text-sm">Get Started</span>
            </button>
          </Link>
        </div>

        <div className='mt-24 w-full flex items-center justify-center'>
          <Preview />
        </div>

        <div className='mt-40 w-full py-12 items-center justify-center bg-white dark:bg-lightBlack flex flex-col  overflow-clip mb-40'>
          <span className="font-main font-semibold text-[3rem] mr-4 text-darkBlue w-[50%] text-center mb-4 dark:text-white2">
            Empowered by the Cutting-Edge Technology Stack
          </span>
          <LogoCarousel />
        
        </div>
      </div>
      {/* <div className="p-40 flex gap-16">
        <div className="w-1/2 h-[40rem] flex flex-col">
          <span className="font-main text-[3rem] text-darkBlue font-semibold">The New Generation Of Learning New Skills</span>
          <span className="font-main text-gray">Welcome to SkillSwap, where we believe in empowering individuals through knowledge sharing. Join us today and be part of the revolution.</span>
        </div>
        <div className="w-1/2 h-[40rem]">

        </div>
      </div>

      <div className="flex">
        <Footer />
      </div> */}

    </div>
  );
};

export default Landing;
