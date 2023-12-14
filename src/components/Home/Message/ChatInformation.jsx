import { useEffect, useState} from "react";
import { fetchInfo } from '../../../redux/api/ProfileRequest.ts';

const ChatInformation = ({chat, currentUser}) => {
  const [ userData, setUserData ] = useState(null);

  useEffect(() => {

    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await fetchInfo(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);


  return (
    <div className="flex flex-col justify-between h-full relative w-full bg-white rounded-2xl ring-1 ring-gray/20 dark:bg-lightBlack/70 dark:ring-darkGray">
      <div className="flex flex-col items-center justify-start gap-2">
        <div className="flex-shrink-0 mt-4 xs:rounded-[2.5rem] sm:rounded-[3rem] p-1 border-white xs:w-24 xs:h-24 sm:w-32 sm:h-32 dark:border-lightBlack">
          <img src={userData?.profilePicture} alt="" className="xs:rounded-[2rem] sm:rounded-[2.5rem] border-white border-4 xs:w-24 xs:h-24 sm:w-32 sm:h-32 dark:border-lightBlack object-cover"/>
        </div>
        <div className="flex flex-col items-center justify-center">
            <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2">{userData?.firstName + " " + userData?.lastName}</span>
            <span className="font-main xs:text-xs sm:text-sm font-medium text-gray inline-flex flex-wrap items-center justify-center dark:text-darkWhite">{userData?.expertise}</span>
          </div>
      </div>
    </div>
  )
}

export default ChatInformation