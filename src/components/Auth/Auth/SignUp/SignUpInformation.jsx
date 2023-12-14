import { useState, useRef } from 'react'
import { localSignUp } from '../../../../redux/api/AuthRequest.ts'
import locations from '../../../../constants/Locations.ts'
import Dropdown from "../../../global/Dropdown.jsx"
import CheckBox from '../../../global/CheckBox.jsx'
import BirthDatePicker from '../../../global/BirthDatePicker.jsx'
import ChevronLeft from '../../../../icons/ChevronLeft.jsx'
import WarningIcon from  '../../../../icons/WarningIcon.jsx';
import TermsAndCondition from './TermsAndCondition.jsx'
import GeeTest from 'react-geetest-v4';

const SignUpInformation = ({
  handlePasswordBack,
  setShowVerify,
  firstName, 
  setFirstName, 
  lastName, 
  setLastName,
  address,
  setAddress, 
  dateOfBirth, 
  setDateOfBirth,
  newSignUpData,
  setShowPassword,
  setUserId,
}) => {
  const captchaRef = useRef(null);
  const [ check, setCheck ] = useState(false)
  const [ formattedDate, setFormattedDate ] = useState()
  const [ error, setError ] = useState(false)
  const [ errorMessage, setErrorMesage ] = useState("")
  const [ openTermsAndCondition, setOpenTermsAndCondition ] = useState(false)
  const [ didCaptcha, setDidCaptcha ] = useState(false)

  const handleSignUp = async () =>{

    if (!firstName && !lastName && !address && !dateOfBirth){
      setError(true)
      setErrorMesage("All fields are required!")
      return null
    }


    if (!firstName){
      setError(true)
      setErrorMesage("First Name is required!")
      return null
    }
    if (!lastName){
      setError(true)
      setErrorMesage("Last name is required!")
      return null
    }
    if (!address){
      setError(true)
      setErrorMesage("Address is required!")
      return null
    }
    if (!dateOfBirth){
      setError(true)
      setErrorMesage("Date of Birth is required!")
      return null
    }
    if (!check){
      setError(true)
      setErrorMesage("You must agree to the terms and condition!")
      return null
    }
    if (!didCaptcha){
      captchaRef.current.showCaptcha()    
      return null
    }

    const { data } = await localSignUp(newSignUpData)
    console.log(data)
    setUserId(data._id)
    setShowPassword(false)
    setShowVerify(true)
  }


  return (
    <div className="flex flex-col ring-1 ring-lightGray dark:ring-darkGray content-center items-center bg-white dark:bg-lightBlack/70  p-4 rounded-3xl  border-white w-[25rem] h-auto">
      <div className="flex items-center justify-center mt-4 w-full">
        <button className="h-16 flex cursor-pointer mr-4 items-center justify-center" onClick={handlePasswordBack}  >
          <div className="bg-lightGray dark:bg-darkGray w-8 h-8 rounded-lg p-1">
            <ChevronLeft />
          </div>
        </button>
        <div className="flex flex-col w-full">
          <span className="font-main font-bold text-2xl text-darkBlue dark:text-white2">Enter your Information</span>
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">to cotinue using skillswap </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full relative">

        <div className="flex gap-4 h-12 w-full mt-8">
          <input type="text" 
            value={firstName}
            className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 w-1/2 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
              ${error ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
              focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
              transition ease-in-out duration-300
              `}            
            placeholder="First Name" 
            name="firstName" 
            onChange={(e)=>{setFirstName(e.target.value);setError(false);setErrorMesage("")}}
          />

          <input type="text" 
            value={lastName}
            className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 w-1/2 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
              ${error ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
              focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
              transition ease-in-out duration-300
              `}            placeholder="Last Name" 
            name="lastName" 
            onChange={(e)=>{setLastName(e.target.value);setError(false);setErrorMesage("")}}
          />

        </div>
        <div className="flex flex-col gap-4 h-12 w-full ">
          <Dropdown options={locations} name="Locate your address" setState={setAddress} clear={()=>{}} />
        </div>
  
        <div className="h-12 w-full">
          <BirthDatePicker setSelectedDate={setDateOfBirth} selectedDate={dateOfBirth} setFormattedDate={setFormattedDate} formattedDate={formattedDate}/>
        </div>


        { error &&
          <div className="w-full items-start justify-start gap-1 flex">
            <WarningIcon className="stroke-white fill-rose-500 w-5 h-5"/>
            <span className="font-main text-sm text-rose-500">
              {errorMessage}
            </span>
          </div>
        }

        <div className="flex w-full h-12"> 
          <button 
            type="submit" 
            className={`
              bg-Primary  relative shadow-Primary/40 shadow-md   hover:bg-royalBlue hover:shadow-royalBlue/40 hover:shadow-xl  active:bg-blue-800  active:shadow-blue-800/40
              flex justify-center items-center font-main w-full h-12 rounded-xl text-white transition-all duration-150 ease-in-out gap-2
              `}            
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
      
      <GeeTest
        ref={captchaRef}
        captchaId={'99051de51d4772cf204ea96629d5cb7c'}
        product={'bind'}
        onSuccess={() => setDidCaptcha(true)}
      >
      </GeeTest>

      {openTermsAndCondition && <TermsAndCondition setState={setOpenTermsAndCondition} /> }
      <div className="flex items-center justify-start mt-8 text-sm">
        <CheckBox setState={setCheck} state={check} />
        <span className="font-main ml-2 text-darkBlue dark:text-white2">I agree with the</span>
        <button 
          className="font-main font-semibold text-Primary dark:text-royalBlue cursor-pointer ml-1"
          onClick={()=>setOpenTermsAndCondition((prev)=>!prev)}
        >
          terms and condition
        </button>
      </div>
    </div>
  )
}

export default SignUpInformation