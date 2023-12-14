import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import SunIcon from '../../../icons/SunIcon';
import MoonIcon from '../../../icons/MoonIcon';
import { useGlobalContext } from '../../../contexts/GlobalContext';

const Header = () => {
  const initialTheme = localStorage.getItem('theme');
  const [ darkMode, setDarkMode] = useState(initialTheme || 'light');
  const { setShowSignIn } = useGlobalContext();

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]); // Add darkMode to the dependency array

  const handleToggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove(prevMode);
      document.documentElement.classList.add(newMode);
      localStorage.setItem('theme', newMode);
      return newMode; // Return the new mode as the updated state
    });
  };

  return (
    <div className="">
      <div className="flex sm:px-2 md:px-24 pb-4  justify-between h-12 items-center">

        <Link to ="/">
          <div className="flex items-center justify-start ">
              <div className=" transition ease-in-out duration-300 bg-lightGray dark:bg-darkGray rounded-2xl items-center justify-center  flex-shrink-0">
                <img src="https://res.cloudinary.com/dbe7l4mop/image/upload/v1701237701/assets/ynvynktnpsu9r11vrq7f.png" alt="" className="w-12 h-12 p-1"/>
              </div>
              <span className="font-main text-2xl font-bold text-darkBlue pl-4 dark:text-white2 dark:font-semibold">skillswap.</span>
          </div>
        </Link>

        <div className="bg-white-2 px-4">

        </div>
        
        <div className="flex items-center justify-end gap-4 w-full">
          <div >
            <button 
              className="px-1 mr-4 relative w-[4.5rem] h-8 bg-textbox dark:bg-darkGray rounded-xl flex items-center"
              onClick={handleToggleTheme}  
            >
              <div className='absolute left-2'>
                <SunIcon />
              </div>
              <div className='absolute right-2'>
                <MoonIcon />
              </div>
              <div className={`rounded-md transition-transform duration-300 transform ${darkMode === 'dark' ? 'translate-x-8' : 'translate-x-0'}`}>
                {darkMode === 'dark' ? (
                  <div className='bg-lightBlack rounded-lg shadow-md shadow-lightBlack/50 px-1 '>
                    <MoonIcon />
                  </div>
                ) : (
                  <div className='bg-white rounded-lg shadow-md shadow-lightGray/50  px-1 hover:bg-lightGray'>
                    <SunIcon />
                  </div>
                )}
              </div>
            </button>
          </div>
            <div className="flex gap-4">
              <Link to ="/auth" onClick={()=>setShowSignIn(true)}>
                <button className="rounded-lg text-darkBlue ring-1 ring-gray/40 px-4 py-2 max-h-12">
                  <span className="font-main text-sm text-darkBlue dark:text-white2">Sign In</span>
                </button>
              </Link>
              <Link to="/auth" onClick={()=>setShowSignIn(false)}>
                <button className="rounded-lg bg-Primary shadow-2xl shadow-Primary py-2 px-4 text-white max-h-12">
                  <span className="font-main text-sm">Sign Up</span>
                </button>
              </Link>
            </div>
        </div>

      </div>
      <hr className="border-lightGray dark:border-darkGray border-1"/>
    </div>
  )
}


export default Header