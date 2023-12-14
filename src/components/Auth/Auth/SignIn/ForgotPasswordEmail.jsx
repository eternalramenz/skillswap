import React, { useState } from 'react'
import ChevronLeft from '../../../../icons/ChevronLeft.jsx'
import { verifyAccountEmail } from '../../../../redux/api/AuthRequest.ts'
import { validateEmail } from '../../../../constants/Functions.ts'
import WarningIcon from  '../../../../icons/WarningIcon.jsx';
import SpinnerIcon from '../../../../icons/SpinnerIcon.jsx'

const ForgotPasswordEmail = ({setTogglePage, email, setEmail, setUserId}) => {

  const [ error, setError ] = useState(false)
  const [ errorMessage, setErrorMesage ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const handleVerify = async () => {

    if (!email){
      setError(true)
      setErrorMesage("Email is required!")
      return null
    }
    if (!validateEmail(email)){
      setError(true)
      setErrorMesage("Email is not valid!")
      return null
    }
    
    try {
      setLoading(true)
      const res = await verifyAccountEmail(email)
      console.log(res.data)
      setEmail(email)
      setUserId(res.data)
      setTogglePage("ForgotPasswordVerification")
    } catch (error) {
      setError(true)
      setErrorMesage("We couldn't find an account with the provided email address. Please make sure you've entered the correct email")
    }
    setLoading(false)
  }



  return (
    <div className="flex flex-col content-center items-center gap-4 bg-white p-4 rounded-3xl w-[25rem]  dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray">
      
      <div className="flex items-start justify-start mt-4 w-full gap-2">
        <button className="w-16 h-16 flex items-start" onClick={()=>{setEmail(""); setTogglePage("SignInCredentials")}}>
          <div className="bg-lightGray dark:bg-darkGray w-8 h-8 rounded-lg p-1">
            <ChevronLeft />
          </div>
        </button>
        <div className="flex flex-col gap-4">
          <span className="font-main font-bold text-2xl text-darkBlue dark:text-white2">Reset your password</span>
          <span className="font-main text-sm text-gray dark:text-darkWhite dark">Enter your email address and we will send you instructions to reset your password.</span>
        </div>
      </div>


      <div className="flex flex-col gap-4 h-12 w-full ">
        <input 
          type="text"
          autoComplete='off' 
          className={`placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
            ${error ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
            focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
            transition ease-in-out duration-300
            `}
          placeholder="Email Address" 
          onChange={(e)=>{setEmail(e.target.value);setError(false);setErrorMesage("")}}
        />
      </div>


      { error &&
        <div className="w-full items-start justify-start gap-1 flex">
          <WarningIcon className="stroke-white fill-rose-500 w-5 h-5"/>
          <span className="font-main text-sm text-rose-500">
            {errorMessage}
          </span>
        </div>
      }

      <div className="flex w-full"> 
        <button 
          type="submit" 
          className={`shadow-xl  flex justify-center gap-2 items-center font-main w-full h-12 ${loading ?  "bg-gray cursor-not-allowed shadow-gray/40" : "bg-Primary shadow-Primary/40"}  rounded-xl text-white`}
          onClick={handleVerify}
          disabled={loading}
          >
            {loading &&
              <div className="w-4 h-4 ">
                <SpinnerIcon /> 
              </div>
            }
            <span>{loading ? "Verifying..." : "Continue"}</span>
        </button>
      </div>


      <button 
        className="mt-4" 
        onClick={()=>{
          setEmail("");
          setTogglePage("SignInCredentials")
        }}
      >
        <span className="font-main text-sm text-darkBlue dark:text-white2">
          Go Back to Sign In 
        </span>
      </button>
    </div>
  )
}

export default ForgotPasswordEmail