import { useState } from 'react';
import RightChevronIcon from '../../icons/RightChevronIcon.jsx'
import LeftChevronIcon from '../../icons/LeftChevronIcon.jsx'

const ImageCarousel = ({props, currentImage, setCurrentImage}) => {

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % props.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? props.length - 1 : prev - 1));
  };

  const imageAnimation = {
    transform: `translateX(-${currentImage * (100 / props.length)}%)`,
    transition: 'transform 0.3s ease-in-out',
    width: `${props.length * 100}%`,
  };

  const handleDotClick = (index) =>{
    setCurrentImage(index)
  }
  return (
    <div className="w-full px-2 relative mt-4 mb-4" >
      <div className="relative max-h-96 overflow-hidden" style={{ borderRadius: '24px'}}>
        <div style={imageAnimation} className="flex" >
          {props.map((image, index) => (
            <img 
              key={index} 
              src={image} alt="" 
              className="object-cover w-full overflow-hidden xs:h-56 sm:h-96"        
            />
          ))}
        </div>
      </div>

      { props.length > 1 &&
        <>
          <div className="dark:bg-lightBlack dark:text-white2 dark:font-medium bg-white font-main text-xs font-semibold h-4 w-12 flex top-7 right-7 items-center py-[10px] justify-center absolute text-darkBlue rounded-full">
            <span>{currentImage+1} / {props.length}</span>
          </div>
        </>
      }

      { props.length > 1 &&
        <>
          <div onClick={prevImage} className="transform hover:scale-125 transition-transform duration-300 h-12 w-12 flex items-center justify-center ml-2 absolute xs:top-20 sm:top-40 mt-4 left-4 bg-gray/20 rounded-full cursor-pointer">
            <LeftChevronIcon />
          </div>
          <div onClick={nextImage} className="transform hover:scale-125 transition-transform duration-300 h-12 w-12 flex items-center justify-center mr-2 absolute xs:top-20 sm:top-40 mt-4 right-4 bg-gray/20 rounded-full cursor-pointer">
            <RightChevronIcon />
          </div>
        </>
      }
      { props.length > 1 &&
        <>
          <div className = "absolute flex justify-center inset-x-[0rem] bottom-10 space-x-2">
            {props.map((image, index) => (
              <div key={index} className={`h-2 w-2 rounded-full cursor-pointer ${ index === currentImage ? 'opacity-100 w-6 bg-white ' : 'bg-white/60'}`} onClick={() => handleDotClick(index)} > </div>
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default ImageCarousel;
