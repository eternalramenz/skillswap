import { useState } from "react";
import { useFocusTrap } from "@mantine/hooks";
import ViewSection from "./ViewSection.jsx";
import EditSection from "./EditSection.jsx";

const PortfolioDrawer = ({ openPortfolioDrawer, setOpenPortfolioDrawer, data}) => {
  const [ toggleEdit, setToggleEdit ] = useState(false)
  const focusTrapRef = useFocusTrap(openPortfolioDrawer);

  if (!data) return
  return (
    <>
      {openPortfolioDrawer && (
        <div
          aria-hidden={true}
          className="dark:bg-black/70 w-full h-full fixed z-40 backdrop-blur-sm bg-black/40 transition-all duration-300 ease-in-out"
          onClick={() => {setOpenPortfolioDrawer((prev) => !prev); setToggleEdit(false)}}
        ></div>
      )}
      <div
        className={`${
          openPortfolioDrawer ? 'translate-y-0' : 'translate-y-full'
        } xl:h-[90%] transition-transform overflow-y-scroll duration-300 ease-in-out bg-white bottom-0 -right-0 overflow-x-hidden fixed h-full w-full z-40 dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray backdrop-blur-md`}
        ref={focusTrapRef}
      >
        { toggleEdit ? 
          <EditSection setOpenPortfolioDrawer={setOpenPortfolioDrawer} setToggleEdit={setToggleEdit} data={data}/>
        :
          <ViewSection setOpenPortfolioDrawer={setOpenPortfolioDrawer} setToggleEdit={setToggleEdit} data={data}/>
        }
      </div>
    </>
  );
};

export default PortfolioDrawer;
