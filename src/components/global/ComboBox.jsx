import React, {useState, useRef, useEffect} from 'react'
import ChevronVertical from '../../icons/ChevronVertical.jsx'
const ComboBox = ({setState, state, list}) => {
  const [ openComboBox, setOpenComboBox ] = useState(false)
  const comboBoxRef = useRef(null);
  const filteredList = list.filter((item)=> item.name !== state)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
        setOpenComboBox(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col relative" ref={comboBoxRef}>
      <button 
        className="ring-1 ring-gray/40 rounded-lg w-full flex px-2 py-2 items-center justify-between dark:bg-transparent  dark:ring-darkGray"
        onClick={()=>{
          setOpenComboBox((prev)=>!prev)
        }}
      >
        <div className="w-full flex items-center justify-start">
          <span className="font-main text-sm text-darkBlue dark:text-white text-left">{state}</span>
        </div>
        <div className="flex items-end h-4 w-4">
          <ChevronVertical />
        </div>
      </button>
      <div className="absolute w-full -bottom-2 left-0">
        { openComboBox &&
          <div
            className=' max-h-40 overflow-y-scroll dark:bg-lightBlack dark:ring-darkGray flex flex-col items-start w-full ring-1 gap-1 ring-gray/40 rounded-lg px-1 py-2 absolute bg-white top-0  dark:z-10'
          >
            {filteredList.map((items, index)=>(
              <button 
                key={index} 
                className=" w-full text-left hover:bg-lightGray px-2 py-1 rounded-md dark:hover:bg-darkGray"
                onClick={(e)=>{
                  e.stopPropagation()
                  setState(items.name)
                  setOpenComboBox((prev)=>!prev)
                }}

              >
                <span className="font-main text-sm dark:text-white2 ">{items.name}</span>
              </button>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default ComboBox