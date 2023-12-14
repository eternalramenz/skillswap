import EditSection from "./EditSection.jsx"
import ViewSection from "./ViewSection.jsx"
import ReviewSection from "./ReviewSection.jsx"
import PostSection from "./PostSection.jsx"
import CreateSection from "./CreateSection.jsx"
import Drawer from '../../global/Drawer.jsx'

const TradeDrawer = ({ 
  data, 
  openTradeDrawer, 
  setOpenTradeDrawer,
  toggleEdit,
  setToggleEdit,
}) => {

  
  return (
    <Drawer openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} >
      { toggleEdit === "Edit" || toggleEdit === "Repropose"  || toggleEdit === "Reschedule" ? (
        <EditSection data={data} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit} toggleEdit={toggleEdit}/>
      ) : toggleEdit === "Review" ? (
        <ReviewSection data={data} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>
      ) : toggleEdit === "Post" ?(
        <PostSection data={data} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>
      ) : toggleEdit === "Create" ? (
        <CreateSection data={data} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>
      ) : (
        <ViewSection data={data} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>
      )}
    </Drawer>
  )
  
}

export default TradeDrawer