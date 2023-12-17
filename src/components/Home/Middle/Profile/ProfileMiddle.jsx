import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Profile from "./Profile.jsx"
import Posts from "./Post/Posts.jsx"
import CreateTradeDrawer from "./Trade/CreateTradeDrawer.jsx";
import TradeDrawer from '../../Trades/TradeDrawer.jsx';
import Informations from './Information/Informations.jsx';
import CreatePortfolio from './Portfolio/CreatePortfolio.jsx';
import CreatePortfolioDrawer from './Portfolio/CreatePortfolioDrawer.jsx';
import PostDrawer from '../../Trades/PostDrawer.jsx'
import Portfolios from './Portfolio/Portfolios.jsx';
import Reviews from './Review/Reviews.jsx';
const ProfileMiddle = () => {
  const postRef = useRef(null);
  const { id } = useParams()
  const { userInformation } = useSelector((state) => state.authReducer.userData);
  const [ activeTab, setActiveTab ] = useState("skills")
  const [ openCreatePortfolioDrawer, setOpenCreatePortfolioDrawer ] = useState(false)
  const [ openCreateTradeDrawer, setOpenCreateTradeDrawer ] = useState(false)
  const [ openPostDrawer, setOpenPostDrawer ] = useState(false)
  const [ openViewTradeDrawer, setOpenViewTradeDrawer ] = useState(false)
  const [ toggleEdit, setToggleEdit ] = useState("View")


  const [ data, setData ] = useState(null)
  const [ info, setInfo ] = useState("") 
  const [ postData, setPostData ] = useState(null)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }
  const scrollToTop = () =>{
    postRef.current.scrollTo({top:0, left:0, behavior:'smooth'})
  }


  return (
    <div className="px-4 flex flex-col gap-4 h-screen w-screen overflow-y-scroll items-center overflow-x-hidden" ref={postRef}>
      <CreateTradeDrawer openTradeDrawer={openCreateTradeDrawer} setOpenTradeDrawer={setOpenCreateTradeDrawer}/>
      <TradeDrawer openTradeDrawer={openViewTradeDrawer} setOpenTradeDrawer={setOpenViewTradeDrawer} data={data} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit}/>
      <PostDrawer openTradeDrawer={openPostDrawer} setOpenTradeDrawer={setOpenPostDrawer} data={postData} />
      <Profile 
        activeTab = {activeTab} 
        handleTabClick={handleTabClick} 
        setOpenCreateTradeDrawer={setOpenCreateTradeDrawer} 
        setOpenViewTradeDrawer={setOpenViewTradeDrawer}
        setData={setData}
        setInfo={setInfo}
      /> 
      <CreatePortfolioDrawer 
        setOpenPortfolioDrawer={setOpenCreatePortfolioDrawer}
        openCreateDrawer={openCreatePortfolioDrawer} 
      /> 


      {activeTab === "posts" && 
        <Posts 
          scrollToTop={scrollToTop} 
          id={id} 
          setOpenTradeDrawer={setOpenPostDrawer} 
          setData={setPostData}
        />
      }
      
      {activeTab === "info" && <Informations data={info}/>}
      {activeTab === "reviews" && <Reviews id={id} scrollToTop={scrollToTop}/>}
      {activeTab === "skills" &&  id === userInformation._id &&  <CreatePortfolio setOpenCreateDrawer={setOpenCreatePortfolioDrawer}/>}
      {activeTab === "skills" && <Portfolios id={id} />}
    </div>
  )
}

export default ProfileMiddle