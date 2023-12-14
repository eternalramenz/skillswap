import React from 'react'
import EditPostSection from './EditPostSection.jsx'
import Drawer from '../../global/Drawer.jsx'

const PostDrawer = ({
  data, 
  openTradeDrawer, 
  setOpenTradeDrawer,
}) => {

  if(!data) return

  return (
    <Drawer openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} >
      <EditPostSection data={data} setOpenTradeDrawer={setOpenTradeDrawer} />
    </Drawer>
  )
}

export default PostDrawer