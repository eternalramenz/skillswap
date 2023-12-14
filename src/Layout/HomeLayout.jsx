import { useState } from 'react';
import HomeLeft from '../components/Home/Left/HomeLeft';
import HomeRight from '../components/Home/Right/HomeRight';
import Navbar from '../components/Home/Navbar/Navbar';
import TradeDrawer from '../components/Home/Trades/TradeDrawer';
import FollowersDrawer from '../components/Home/Left/FollowersDrawer'
import { useGlobalContext } from '../contexts/GlobalContext';

const HomeLayout = ({ children }) => {
  const [ openTradeDrawer, setOpenTradeDrawer ] = useState(false)
  const { openFollowersDrawer, setOpenFollowersDrawer } = useGlobalContext()
  const [ tradeData, setTradeData ] = useState('')
  const [ toggleEdit, setToggleEdit] = useState(false)

  return (
    <>
      <FollowersDrawer openFollowersDrawer={openFollowersDrawer} setOpenFollowersDrawer={setOpenFollowersDrawer}/>
      {tradeData && <TradeDrawer data={tradeData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit}/>}
      <div className="flex flex-col">
        <div className="flex justify-center">
          <Navbar />
          <div className="fixed left-20 z-10 mt-[5.5rem] 2xs:hidden xl:hidden 2xl:block">
            <HomeLeft setOpenFollowersDrawer={setOpenFollowersDrawer}/>
          </div>
          <div className="flex items-center justify-center">
            {children}
          </div>
          <div className="fixed right-2 z-10 mt-[5rem] 2xs:hidden  xl:hidden 2xl:block">
            <HomeRight setTradeData={setTradeData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout