import { useFocusTrap } from "@mantine/hooks";
import PendingSection from "./PendingSection.jsx";
import ProfileSection from "./ProfileSection.jsx";
import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";
const FollowersDrawer = ({ openFollowersDrawer, setOpenFollowersDrawer }) => {
  const focusTrapRef = useFocusTrap(openFollowersDrawer ? true : false)
  const { toggleFollowersDrawer } = useGlobalContext()


  return (
    <>
      {openFollowersDrawer && (
        <div
          aria-hidden={true}
          className="dark:bg-black/70 w-full h-full fixed z-40 backdrop-blur-sm bg-black/40 ease-in-out duration-300"
          onClick={() => setOpenFollowersDrawer((prev) => !prev)}
        ></div>
      )}
        <div
          className={`${
            openFollowersDrawer ? 'translate-x-0' : '-translate-x-full'
          } xs:w-full sm:w-1/2 xl:w-1/3  transition-transform overflow-y-scroll duration-300 ease-in-out bg-white left-0 fixed h-full  z-40 dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray backdrop-blur-xl`}
          ref={focusTrapRef}
        >
          {toggleFollowersDrawer ? (
            <PendingSection setOpenFollowersDrawer={setOpenFollowersDrawer}/>
          ):(
            <ProfileSection setOpenFollowersDrawer={setOpenFollowersDrawer}/>
          )}
      </div>
    </>
  );
};

export default FollowersDrawer;