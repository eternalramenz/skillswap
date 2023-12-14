import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomeIcon from '../../../icons/HomeIcon.jsx';
import CompassIcon from '../../../icons/CompassIcon.jsx';
import MessageIcon from '../../../icons/MessageIcon.jsx';
import TradesIcon from '../../../icons/TradesIcon.jsx';

const Menu = () => {
  const location = useLocation();
  const [highlight, setHighlight] = useState('home');

  // Update the highlight state when the route changes
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/home') {
      setHighlight('home');
    } else if (pathname === '/discover') {
      setHighlight('discover');
    } else if (pathname === '/message') {
      setHighlight('message');
    } else if (pathname === '/trade') {
      setHighlight('trade');
    } else {
      setHighlight(null);
    }
    return () => {
      setHighlight(null);
    }
  }, [location]);

  const handleItemClick = (item) => {
    setHighlight(item);
  };

  return (
    <div className="p-2 item gap-1 ring-1 ring-gray/20 bg-white rounded-2xl shadow-xl shadow-zinc-200 mb-6 dark:shadow-black/20 dark:ring-darkGray mt-2 dark:bg-lightBlack/70 dark:backdrop-blur-3xl">
      
      <div className="w-full flex rounded-2xl px-4 py-2 gap-4  dark:bg-transparent">
        <Link to="/home" onClick={() => handleItemClick('home')} className="flex items-center gap-4 w-full">
          <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'home' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`}>
            <HomeIcon state={highlight === 'home'} />
          </div>
          <span className={`font-main text-md font-semibold ${highlight === 'home' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Home</span>
        </Link>
      </div>

      <div className="w-full flex rounded-2xl px-4 py-2 gap-4 bg-white  dark:bg-transparent">
        <Link to="/trade" onClick={() => handleItemClick('trade')} className="flex items-center gap-4 w-full">
          <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'trade' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`} >
            <TradesIcon state={highlight === 'trade'} />
          </div>
          <span className={`font-main text-md font-semibold ${highlight === 'trade' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Trades</span>
        </Link>
      </div>

      <div className="w-full flex rounded-2xl px-4 py-2 gap-4 bg-white dark:bg-transparent">
        <Link to="/message" onClick={() => handleItemClick('message')} className="flex items-center gap-4 w-full">
          <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'message' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`} >
            <MessageIcon state={highlight === 'message'} />
          </div>
          <span className={`font-main text-md font-semibold ${highlight === 'message' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Messages</span>
        </Link>
      </div>
      
      <div className="w-full flex rounded-2xl px-4 py-2 gap-4 bg-white  dark:bg-transparent">
        <Link to="/discover" onClick={() => handleItemClick('discover')} className="flex items-center gap-4 w-full">
          <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'discover' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`}>
            <CompassIcon state={highlight === 'discover'} />
          </div>
          <span className={`font-main text-md font-semibold ${highlight === 'discover' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Discover</span>
        </Link>
      </div>


    </div>
  );
};

export default Menu;
