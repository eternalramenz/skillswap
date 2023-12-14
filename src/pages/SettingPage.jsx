import { useState } from 'react';
import Options from '../components/Home/Setting/Options'
import Account from '../components/Home/Setting/Account'
import HomeLeft from '../components/Home/Left/HomeLeft';
import Navbar from '../components/Home/Navbar/Navbar';
import FollowersDrawer from '../components/Home/Left/FollowersDrawer';
import Security from '../components/Home/Setting/Security';
import { useSelector } from 'react-redux'

const SettingPage = () => {
  const [ openFollowersDrawer, setOpenFollowersDrawer ] = useState(false)
  const [ activeTab, setActiveTab ] = useState("account")



  return (
    <div className="h-screen overflow-y-clip">
      <Navbar />
      <FollowersDrawer openFollowersDrawer={openFollowersDrawer} setOpenFollowersDrawer={setOpenFollowersDrawer} />

      <div className="flex h-full pt-14 px-12 ">
        <div className="w-[3%] h-full"></div>
        <div className=" w-auto  flex 2xs:hidden xl:hidden 2xl:flex">
          <div className="my-8 w-full flex justify-center items-center flex-col">
            <HomeLeft setOpenFollowersDrawer={setOpenFollowersDrawer}/>
          </div>
        </div>

        <div className=" w-full max-w-[24rem] min-w-[20rem]  flex xs:hidden md:hidden lg:flex">
          <div className="my-8 m-6 p-4  w-full flex  flex-col bg-white rounded-2xl dark:bg-lightBlack/70 ring-1 ring-gray/20 dark:ring-darkGray">
            <span className="text-2xl font-main text-darkBlue font-semibold dark:text-white2">Settings</span>
            <Options activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div>
        </div>

        
        <div className="w-full flex h-full py-8  gap-6 ">
          <div className="overflow-hidden w-full">
            <div className="w-full overflow-y-scroll overflow-x-hidden  p-8 flex flex-col justify-between h-full relative bg-white rounded-2xl ring-1 ring-gray/20 dark:bg-lightBlack/70 dark:ring-darkGray">
              {activeTab === "account" ? <Account /> : <Security />}
            </div>
          </div>
        </div>

        
        
        <div className="w-[3%] h-full"></div>
      </div>


   </div>
  );
};

export default SettingPage;
