import { useState } from 'react'
import Header from './Header.jsx'
import MessageBox from '../../global/MessageBox.jsx';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../../redux/actions/AuthAction.ts';
const Navbar = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ openMessageBox, setOpenMessageBox ] = useState(false)

  return (
    <>
      <MessageBox 
        open={openMessageBox} 
        setOpen={setOpenMessageBox} 
        title="Sign out Confirmation" 
        message="Are you sure you want to sign out? Click Confirm to proceed or Cancel to stay logged in." 
        negative="Cancel"
        postive="Confirm"
        onNegativeClick={()=>{
          setOpenMessageBox(false)
        }}
        onPositiveClick={()=>{
          dispatch(signOut())
          navigate('/')
          queryClient.removeQueries(['notifications'])
          queryClient.removeQueries(['pendingFollowersList'])
          queryClient.removeQueries(['userContacts'])
          queryClient.removeQueries(['accountInformation'])
        }}
      />  
      <nav className=" flex flex-col fixed items-left z-20 left-0 top-0 pt-4 w-full bg-white/70 backdrop-blur-md dark:bg-lightBlack/70 dark:backdrop-blur-xl dark:shadow-xl">
        <Header setOpenMessageBox={setOpenMessageBox}/>
      </nav>
    </>
  )
}

export default Navbar