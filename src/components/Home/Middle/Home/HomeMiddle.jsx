import { useRef } from 'react';
import Traders from './Traders.jsx'
const Home = () => {

  const postRef = useRef(null);

  const scrollToTop = () =>{
    postRef.current.scrollTo({top:0, left:0, behavior:'smooth'})
  }


  return (
    <div className="flex flex-col gap-4 px-[1rem] items-center h-screen w-screen overflow-y-scroll" ref ={postRef}>
      <div className="mt-2 "></div>
      <Traders scrollToTop={scrollToTop}/> 
      <div className=""></div>
    </div>
  );
};

export default Home;
