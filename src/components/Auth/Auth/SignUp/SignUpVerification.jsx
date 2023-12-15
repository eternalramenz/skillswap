import React from 'react'
import { verifyAccountOtp, verifyAccountEmail } from '../../../../redux/api/AuthRequest.ts'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideEmail } from '../../../../constants/Functions.ts'
import WarningIcon from  '../../../../icons/WarningIcon.jsx';
import SpinnerIcon from '../../../../icons/SpinnerIcon.jsx'

const SignUpVerification = ({userId , email, setShowPassword, setShowEmail, setShowVerify}) => {
  

  const dispatch = useDispatch()
  const [ error, setError ] = useState(false)
  const [ errorMessage, setErrorMesage ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ otp, setOtp ] = useState("")
  const [ timer, setTimer] = useState(60);

  const handleVerify = async () => {
    if (!otp) {
      setError(true)
      setErrorMesage("Otp is required!")
      return null
    }

    try {
      setLoading(true)
      const res = await verifyAccountOtp(otp, userId)
      if (res.status === 200){
        setOtp("")
        setShowPassword(false)
        setShowEmail(false)
        setShowVerify(false)
        dispatch({type: "AUTH_SUCCESS", data: res.data})
      }
      if (res.status  === 203){
        setError(true)
        setErrorMesage("Otp is incorrect")
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!timer) {
      setTimer(60);
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer && prevTimer - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(countdown);
        setTimer(null);
      }, 60000);
      try {
        await verifyAccountEmail(email)
      } catch (error) {
        console.log(error)
      }
    }
  };

  
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [timer]);

  return (
    <div className="flex flex-col ring-1 gap-4 ring-lightGray dark:ring-darkGray content-center items-center bg-white dark:bg-lightBlack/70  p-4 rounded-3xl  border-white w-[25rem] h-auto">
      
      <div className="flex items-start justify-start ml-4 mt-4 w-full ">
        <div className="flex flex-col">
          <span className="font-main font-bold text-2xl text-darkBlue dark:text-white2">Verify your Account</span>
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">We've sent an OTP to your email account {hideEmail(email)} </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col h-12 w-full ">
          <input 
            type="numeric"
            autoComplete='off' 
            className={`placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
              ${error ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
              focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
              transition ease-in-out duration-300
              `}          
            placeholder="Verification Code" 
            onChange={(e)=>{setOtp(e.target.value.replace(/\D/g, ''));setError(false);setErrorMesage("")}}
            maxLength={8}
          />
        </div>

        { error &&
          <div className="w-full items-start justify-start gap-1 flex ">
            <WarningIcon className="stroke-white fill-rose-500 w-5 h-5"/>
            <span className="font-main text-sm text-rose-500">
              {errorMessage}
            </span>
          </div>
        }
      </div>

      <div className="flex w-full"> 
          <button 
            type="submit" 
            className={`
              ${loading ?  "bg-gray cursor-not-allowed shadow-gray/40" 
              : 
              "bg-Primary  relative shadow-Primary/40 shadow-md   hover:bg-royalBlue hover:shadow-royalBlue/40 hover:shadow-xl  active:bg-blue-800  active:shadow-blue-800/40"}
              flex justify-center items-center font-main w-full h-12 rounded-xl text-white transition-all duration-150 ease-in-out gap-2
              `}            
            onClick={handleVerify}
            disabled={loading}
            >
            {loading &&
              <div className="w-4 h-4 ">
                <SpinnerIcon /> 
              </div>
            }
            <span>{loading ? "Verifying..." : "Verify"}</span>        
          </button>
      </div>

      <div className="mt-2">
        <span className="font-main text-sm dark:text-darkWhite">
          Didn't receive code? 
          <button disabled={timer} onClick={handleResend} className={`ml-2 font-main font-medium dark:font-medium text-sm ${timer ? 'text-gray dark:text-darkWhite cursor-not-allowed' : 'text-Primary dark:text-royalBlue' } `}>
            Resend{timer > 0 && "("+timer+")"}
          </button>
        </span>
      </div>
    </div>
  )
}

export default SignUpVerification