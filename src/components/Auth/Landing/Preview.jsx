import React from 'react'
import Traders from './Traders.jsx'
import Contact from './Contact.jsx'
import ProfileCard from './ProfileCard.jsx'
import Menu from './Menu.jsx'
import Followers from './Followers.jsx'
import ScheduleTracker from './ScheduleTracker.jsx'
const Preview = () => {
  return (
    <div className='flex pt-8 px-8 h-[40rem] overflow-clip items-center gap-2 justify-center max-w-[80rem] rounded-3xl bg-white   dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray'>
      <div className="flex flex-col h-full w-[25%] p-1">
        <ProfileCard />
        <Menu />
        <Followers />
      </div>
      <div className="h-full flex flex-col gap-6 w-[50%] overflow-hidden px-4  p-1">
        <Traders />
      </div>
      <div className="h-full w-[25%] p-1 flex flex-col gap-6">
        <div>
          <ScheduleTracker/>
        </div>
        <div className="bg-white flex flex-col gap-1 dark:bg-lightBlack overflow-hidden rounded-xl ring-1 ring-lightGray dark:ring-darkGray p-4">
          <Contact name="Rench Smith" picture="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" message="Hope to see you soon!"/>
          <Contact name="Gabriel Cruz" picture="https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" message="Thank you for trading with me"/>
          <Contact name="Miguel Delgado" picture="https://images.pexels.com/photos/16465979/pexels-photo-16465979/free-photo-of-woman-standing-in-a-rapeseed-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" message="Tara pre trade uli"/>
          <Contact name="Reze Santos" picture="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" message="It was a pleasure trading with you"/>
        </div>
      </div>
    </div>
  )
}

export default Preview