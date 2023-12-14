import { fetchContacts } from '../../../redux/api/ChatRequest.ts';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import Contacts from './Contacts.jsx'
import ScheduleTracker from './ScheduleTracker.jsx';

const HomeRight = ({setTradeData, setOpenTradeDrawer}) => {
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const fetchContact = async () => {
    const { data } = await fetchContacts(userInformation._id);
    return data;
  };
  const { data, status, error } = useQuery(['userContacts'], fetchContact);

  if (status === 'loading') return null

  return (
    <>
      <div className=" flex flex-col pl-10 p-4 items-left overflow-y-auto" id="leftSideScrollBar">
        <div className="mr-16 mb-24 w-[20rem]">
          <ScheduleTracker setOpenTradeDrawer={setOpenTradeDrawer} setData={setTradeData}/>
        

          { data.length > 0 &&
          <>
            <div className="flex justify-between mb-4 mt-2">
              <span className="font-main text-sm font-semibold text-gray pl-4 dark:text-darkWhite">CONTACTS</span>
            </div>
            <div className='bg-white dark:bg-lightBlack max-h-[16em] overflow-hidden w-80 rounded-lg ring-1 ring-lightGray dark:ring-darkGray'>
              <div className="overflow-y-scroll overflow-x-hidden max-h-[16rem] flex flex-col gap-4 p-4">
                <Contacts props={data}/>
              </div>
            </div>
          </>
          }
        </div>
      </div>
    </>
  )
}

export default HomeRight