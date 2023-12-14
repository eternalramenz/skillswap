import { useState } from "react";
import TradeDrawer from './TradeDrawer'

import AllTrades from "./AllTrades.jsx"
import AcceptedTrades from "./AcceptedTrades.jsx"
import InvitationsTrades from './InvitationTrades.jsx'
import RequestedTrades from './RequestTrades.jsx'
import CompletedTrades from './CompletedTrades.jsx'
import CancelledTrades from './CancelledTrades.jsx'
import TradeDashboard from "./TradeDashboard.jsx";


const TradeMiddle = () => {
  const [ data, setData ] = useState(null)
  const [ openTradeDrawer, setOpenTradeDrawer ] = useState(false)
  const [ activeTab, setActiveTab ] = useState("All")
  const [ toggleEdit, setToggleEdit ] = useState("View")

  return (
    <div className="px-4 flex flex-col h-screen w-screen overflow-y-scroll items-center overflow-x-hidden" >
      <TradeDashboard setActiveTab={setActiveTab} activeTab={activeTab}/>
      <TradeDrawer data={data} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit}/>
      
      {activeTab === "All" && <AllTrades setData={setData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>}
      {activeTab === "Accepted" && <AcceptedTrades setData={setData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>}
      {activeTab === "Invitations" && <InvitationsTrades setData={setData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>}
      {activeTab === "Requests" && <RequestedTrades setData={setData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>}
      {activeTab === "Completed" && <CompletedTrades setData={setData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} />}
      {activeTab === "Cancelled" && <CancelledTrades setData={setData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} />}
    
    </div>
  )
}

export default TradeMiddle