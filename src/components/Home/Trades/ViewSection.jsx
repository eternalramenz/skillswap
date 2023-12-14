import CloseIcon from '../../../icons/CloseIcon.jsx'
import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";
import DetailsSection from './DetailsSection.jsx'
import AuditSection from './AuditSection.jsx'

const ViewSection = ({ data, setOpenTradeDrawer, setToggleEdit}) => {

  const { isTradeDetailsActive, setIsTradeDetailsActive } = useGlobalContext()

  if (!data ) return null

  return (


    <div className="h-full flex flex-col pl-6 pr-4 py-10 transition-all ">
      <div className="flex items-center justify-start">          
        <button 
          className=" w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => {setOpenTradeDrawer((prev) => !prev); setIsTradeDetailsActive(true)}}
        >
          <CloseIcon />
        </button>
      </div>


      <div className="mt-12 flex p-1 rounded-lg dark:bg-darkGray bg-lightGray w-60">
        <button 
          className={`${isTradeDetailsActive ?'dark:bg-lightBlack bg-white':'bg-transparent'} p-1 rounded-md px-4 flex items-center justify-center  w-32`}
          onClick={()=>{setIsTradeDetailsActive(true)}}
        >
          <span className={`${isTradeDetailsActive ?'dark:text-white2 text-darkBlue font-medium':'dark:text-darkWhite text-gray'} text-md font-main`}>
            Details
          </span>
        </button>
        <button 
          className={`${isTradeDetailsActive ?'bg-transparent':'dark:bg-lightBlack bg-white'} p-1 rounded-md px-4 flex items-center justify-center  w-32`}
          onClick={()=>{setIsTradeDetailsActive(false)}}
        >
          <span className={`${isTradeDetailsActive ?'dark:text-darkWhite text-gray':'dark:text-white2 text-darkBlue font-medium'} text-md font-main`}>
            Audit Trail
          </span>
        </button>
      </div>

      {isTradeDetailsActive ? (
        <DetailsSection data={data} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit}/>
      ) : (
        <AuditSection data={data} setOpenTradeDrawer={setOpenTradeDrawer}/>
      )
      }

    </div>
  )
}

export default ViewSection