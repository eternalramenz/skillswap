import { GlobalContextProvider, useGlobalContext } from './contexts/GlobalContext.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import ProfilePage from  "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import SetupPage from "./pages/SetupPage";
import ChatPage from './pages/ChatPage';
import TradePage from './pages/TradePage';
import SettingPage from './pages/SettingPage';
import HomeLayout from './Layout/HomeLayout';

const App = () => {
  const user = useSelector((state) => state.authReducer.userData);
  const didSetupProfile = user && user?.userInformation.didSetupProfile;


  return (
    <div className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]
      dark:from-black1 dark:via-zinc-800 dark:to-black1
      from-slate-100 via-white2 to-white1
      text-darkBlue font-main
      [&_::-webkit-scrollbar-thumb]:rounded-full
      [&_::-webkit-scrollbar-thumb]:bg-gray/40
      [&_::-webkit-scrollbar-track]:bg-lightGray
      [&_::-webkit-scrollbar-thumb]:dark:bg-darkGray
      [&_::-webkit-scrollbar-track]:dark:bg-lightBlack transition ease-in-out duration-300
      
      "
      
    >
      <div>
        <Routes>
          <Route 
            path='/'
            element={ 
              user ? 
              ( didSetupProfile ? <HomeLayout><HomePage/></HomeLayout>
              : <Navigate to={`../setup/${user.userInformation._id}`} /> ) 
              : <LandingPage />
            }
          />
          <Route 
            path='/auth' 
            element={ user ? <Navigate to="../home" /> : <AuthPage /> }
          />
          <Route 
            path='setup/:id'
            element={ 
              user ? 
              ( didSetupProfile ? <Navigate to='../home' /> 
              : <SetupPage /> ) 
              : <Navigate to="../auth" /> 
            }
          />
          <Route 
            path='/*'
            element={ 
              user ? 
              ( didSetupProfile ? <HomeLayout><HomePage/></HomeLayout>
              : <Navigate to={`../setup/${user.userInformation._id}`} /> ) 
              : <Navigate to='../auth' />  
            }
          />
          <Route 
            path='home'
            element={ 
              user ? 
              ( didSetupProfile ? <HomeLayout><HomePage/></HomeLayout>
              : <Navigate to={`../setup/${user.userInformation._id}`} /> ) 
              : <Navigate to='../auth' />  
            }
          />
          <Route 
            path='trade'
            element={ 
              user ? 
              ( didSetupProfile ? <HomeLayout><TradePage/></HomeLayout>: <Navigate to='../setup' /> ) 
              : <Navigate to='../auth' /> 
            }
          />
          <Route 
            path='message'
            element={ 
              user ? 
              ( didSetupProfile ?  <ChatPage /> : <Navigate to='../setup' /> ) 
              : <Navigate to='../auth' /> 
            }
          />
          <Route 
            path='discover'
            element={ 
              user ? 
              ( didSetupProfile ? <HomeLayout><DiscoverPage /></HomeLayout> : <Navigate to='../setup' /> )
              : <Navigate to='../auth' /> 
            }
          />
          <Route 
            path='setting'
            element={ 
              user ? 
              ( didSetupProfile ? <SettingPage /> : <Navigate to='../setup' /> )
              : <Navigate to='../auth' /> 
            }
          />
          <Route
            path='profile/:id' 
            element={ 
              user ? 
              ( didSetupProfile ? <HomeLayout><ProfilePage /></HomeLayout> : <Navigate to='../setup' /> )
              : <Navigate to="../auth" /> 
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App;
