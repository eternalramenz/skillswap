import Slider from 'react-infinite-logo-slider'

const LogoCarousel = () => {

  return (
    <>
      <Slider
        width="250px"
        duration={40}
        pauseOnHover={false}
        blurBorders={true}
        blurBoderColor={'#fff'}
        
      >
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" alt="" className=" object-cover h-10 "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">        
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="" className=" object-cover h-12 "/>
          <span className="font-main font-medium text-2xl text-darkBlue dark:text-white2">Typescript</span>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="" className=" object-cover h-12 "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg" alt="" className=" object-cover h-10 "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="" className=" object-cover h-12 "/>
          <span className="font-main font-medium text-2xl text-darkBlue dark:text-white2">React</span>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://www.logo.wine/a/logo/Google_Maps/Google_Maps-Logo.wine.svg" alt="" className=" object-cover "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://seeklogo.com/images/J/jwt-logo-11B708E375-seeklogo.com.png" alt="" className="w-[60%] object-cover "/>
        </Slider.Slide>
      </Slider>
      <Slider
        width="250px"
        duration={40}
        pauseOnHover={false}
        blurBorders={true}
        blurBoderColor={'#fff'}
      >

        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://seeklogo.com/images/J/jwt-logo-11B708E375-seeklogo.com.png" alt="" className="w-[60%] object-cover "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="" className=" object-cover h-12 "/>
          <span className="font-main font-medium text-2xl text-darkBlue dark:text-white2">React</span>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" alt="" className=" object-cover h-10 "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="" className=" object-cover h-12 "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">        
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="" className=" object-cover h-12 "/>
          <span className="font-main font-medium text-2xl text-darkBlue dark:text-white2">Typescript</span>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg" alt="" className=" object-cover h-10 "/>
        </Slider.Slide>
        <Slider.Slide className="dark:bg-lightBlack/70 dark:ring-darkGray m-4 p-8 min-w-[20rem] rounded-2xl ring-1 ring-gray/40 h-20 flex items-center justify-center gap-4">
          <img src="https://www.logo.wine/a/logo/Google_Maps/Google_Maps-Logo.wine.svg" alt="" className=" object-cover "/>
        </Slider.Slide>
      </Slider>
    </>
  );
};
 
 export default LogoCarousel;