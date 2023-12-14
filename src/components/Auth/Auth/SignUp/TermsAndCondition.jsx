import CloseIcon from '../../../../icons/CloseIcon.jsx'
import { skillSwapWebsiteTermsAndConditions  } from '../../../../constants/TermsAndCondition.ts'

const TermsAndCondition = ({setState}) => {
  return (
    <div className="absolute z-10 p-4 ring-1 rounded-3xl flex flex-col gap-4 bg-white1 ring-lightGray dark:ring-darkGray dark:bg-lightBlack w-[30rem] h-[40rem] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full flex items-center justify-end">

        <button onClick={()=>setState((prev)=>!prev)} className="w-8 h-8 bg-lightGray rounded-xl">
          <CloseIcon />
        </button>
      </div>
      <div className="bg-lightGray w-full h-full overflow-y-scroll overflow-x-hidden rounded-md p-4 dark:bg-darkGray">
        <span className="whitespace-pre-line text-sm text-darkGray font-main dark:text-white2">
          {skillSwapWebsiteTermsAndConditions}
        </span>
      </div>
    </div>
  )
}

export default TermsAndCondition