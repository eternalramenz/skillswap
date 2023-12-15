import { useFocusTrap } from "@mantine/hooks";

const MessageBox = ({ open, setOpen,message,title, negative, postive, onNegativeClick, onPositiveClick}) => {
  const focusTrapRef = useFocusTrap(setOpen ? true : false)

  return (
    <>
      {open && (
        <div
          aria-hidden={true}
          className="dark:bg-black/70 w-full h-full flex items-center justify-center fixed z-40 backdrop-blur-sm bg-white/40 ease-in-out duration-300"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div 
            className="w-[32rem] p-6 h-[12rem] z-40 flex flex-col justify-between dark:bg-lightBlack/70 backdrop-blur-xl dark:ring-darkGray bg-white rounded-lg ring-1 ring-lightGray shadow-gray/10 shadow-lg"
            ref={focusTrapRef}
            onClick={(e)=> e.stopPropagation()}
          >
            <div className="flex flex-col gap-3">
              <div>
                <h1 className="font-main font-semibold text-xl text-darkBlue dark:text-white2">
                  {title}
                </h1>
              </div>
              <div>
                <p className="font-main text-sm text-gray dark:text-darkWhite">
                  {message}
                </p>
              </div>
            </div>
            <div className="gap-2 flex items-center justify-end"> 
              <button 
                className="font-main text-sm outline-none text-gray ring-1 dark:ring-darkGray dark:text-darkWhite ring-gray/40 rounded-lg px-4 py-2" 
                onClick={onNegativeClick}
                >
                {negative}   
              </button>
              <button 
                className="font-main text-sm outline-none text-white bg-rose-500 rounded-lg px-4 py-2 hover:bg-rose-400 active:bg-rose-600"
                onClick={onPositiveClick}
              >
                {postive}   
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default MessageBox;
