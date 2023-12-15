import { useFocusTrap } from "@mantine/hooks";

const Drawer = ({ openTradeDrawer, setOpenTradeDrawer, children }) => {
  const focusTrapRef = useFocusTrap(openTradeDrawer ? true : false)
  return (
    <>
      {openTradeDrawer && (
        <div
          aria-hidden={true}
          className="dark:bg-black/70 w-full h-full fixed z-40 backdrop-blur-sm bg-white/40  ease-in-out duration-300"
          onClick={() => setOpenTradeDrawer((prev) => !prev)}
          
        ></div>
      )}
      <div
        className={`${
          openTradeDrawer ? 'translate-x-0' : 'translate-x-full'
        } lg:w-1/2 xl:w-1/3  transition-transform overflow-y-scroll duration-300 ease-in-out bg-white right-0 fixed h-full  z-40 dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray backdrop-blur-xl`}
        ref={focusTrapRef}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
