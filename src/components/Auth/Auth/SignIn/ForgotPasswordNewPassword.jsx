import React from 'react'
import { forgotPassword } from '../../../../redux/api/AuthRequest.ts'
import { useState } from 'react' 
import zxcvbn from 'zxcvbn';
import EyeIcon from '../../../../icons/EyeIcon.jsx';
import EyeOffIcon from '../../../../icons/EyeOffIcon.jsx';
import WarningIcon from  '../../../../icons/WarningIcon.jsx';
import SpinnerIcon from '../../../../icons/SpinnerIcon.jsx';

const ForgotPasswordNewPassword = ({setTogglePage, userId}) => {
  const [ newPasswordError, setNewPasswordError ] = useState("")
  const [ confirmPasswordError, setConfirmPasswordError ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState(false)
  const [ newPassword, setNewPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ isTyping, setIsTyping] = useState(false);
  const [ togglePassword, setTogglePassword ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const passwordStrength = isTyping ? zxcvbn(newPassword) : { score: 0 };


  const handleSubmit = async () =>{

    if (!newPassword ){
      setNewPasswordError(true)
      setErrorMessage("Password is required")
      return null
    }

    if (!confirmPassword ){
      setConfirmPasswordError(true)
      setErrorMessage("Confirm Password is required")
      return null
    }

    if (!newPassword && !confirmPassword ){
      setNewPasswordError(true)
      setConfirmPasswordError(true)
      setErrorMessage("All fields are required")
      return null
    }
  

    if (newPassword.length < 8) {
      setNewPasswordError(true)
      setErrorMessage("Password must be at least 8 characters!");
      return null;
    }

    if (!/[!@#$%^&*(),.?"; :{}|<>]/.test(newPassword)) {
      setNewPasswordError(true)
      setErrorMessage("Password must contain at least one special character!");
      return null;
    }

    if (!/\d/.test(newPassword)) {
      setNewPasswordError(true)
      setErrorMessage("Password must contain at least one number!");
      return null;
    }

    if (!/[a-z]/.test(newPassword)) {
      setNewPasswordError(true)
      setErrorMessage("Password must contain at least one lowercase letter!");
      return null;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setNewPasswordError(true)
      setErrorMessage("Password must contain at least one uppercase letter!");
      return null;
    }
    

    if (newPassword !== confirmPassword ){
      setNewPasswordError(true)
      setConfirmPasswordError(true)
      setErrorMessage("Password do not match")
      return null
    }
    

    try {
      setLoading(true)
      const res = await forgotPassword(userId, {password: newPassword})
      console.log(res)
      setTogglePage("SignInCredentials")
    } catch (error) {
      if(error.response.status === 204){
        console.log(error)
      }
      if(error.response.status === 403){
        setNewPasswordError(true)
        setConfirmPasswordError(true)
        setErrorMessage("Your new password cannot be the same as your old password")
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col content-center items-center gap-4 bg-white p-4 rounded-3xl w-[25rem] h-auto dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray">

      <div className="flex items-start justify-start ml-4 mt-4 w-full ">
        <div className="flex flex-col">
          <span className="font-main font-bold text-2xl text-darkBlue dark:text-white2">Create New Password</span>
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">Enter a new password below to change your password</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-12 w-full relative">
        <input 
          type={togglePassword ? "password" : "text"}
          value={newPassword}
          className={`placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
            ${newPasswordError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
            focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
            transition ease-in-out duration-300
            `}          
          placeholder="Password"
          maxLength={24}
          onChange={(e)=>{
            setNewPassword(e.target.value);
            setNewPasswordError(false);
            setConfirmPasswordError(false);
            setErrorMessage("");
            setIsTyping(true)
          }}
        />
        {newPassword && (
            <button className="w-6 h-6 absolute right-4 top-3 cursor-pointer" onClick={()=>setTogglePassword((prev)=>!prev)}> 
              {togglePassword ? 
                <EyeIcon color={`${newPasswordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/> 
              : 
                <EyeOffIcon color={`${newPasswordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/>
              }
            </button>
          )}
      </div>

      
      { isTyping &&
        <div className="flex items-center gap-2 w-full h-1">
          <div className={`flex-grow h-1 ${passwordStrength.score >= 0 ?'bg-rose-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
          <div className={`flex-grow h-1 ${passwordStrength.score >= 2 ?'bg-yellow-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
          <div className={`flex-grow h-1 ${passwordStrength.score >= 3 ?'bg-green-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
            {passwordStrength.score >= 0 && passwordStrength.score < 1 && <span className="w-20 text-center font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Weak</span>}
            {passwordStrength.score >= 1 && passwordStrength.score < 2 && <span className="w-20 text-center font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Very Weak</span>}
            {passwordStrength.score >= 2 && passwordStrength.score < 3 && <span className="w-20 text-center font-main text-xs text-yellow-500 dark:text-yellow-500 dark:font-normal mt-1">Moderate</span>}
            {passwordStrength.score >= 3 && passwordStrength.score < 4 && <span className="w-20 text-center font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Strong</span>}
            {passwordStrength.score >= 4 && <span className="w-20 text-center font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Very Strong</span>}
        </div>
      }


      <div className="flex gap-4 h-12 w-full flex-col relative">
        <input 
          type={togglePassword ? "password" : "text"}
          value={confirmPassword}
          className={`placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
            ${confirmPasswordError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
            focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
            transition ease-in-out duration-300
            `}          
          placeholder="Confirm Password" 
          maxLength={24}
          onChange={(e)=>{
            setConfirmPassword(e.target.value);
            setNewPasswordError(false);
            setConfirmPasswordError(false);
            setErrorMessage("");
            setIsTyping(false)
          }}
        />
          {confirmPassword && (
            <button className="w-6 h-6 absolute right-4 top-3 cursor-pointer" onClick={()=>setTogglePassword((prev)=>!prev)}> 
            
              {togglePassword ? 
                <EyeIcon color={`${confirmPasswordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/> 
              :
                <EyeOffIcon color={`${confirmPasswordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/>
              }

            </button>
          )}
      </div>

      { (newPasswordError || confirmPasswordError) &&
        <div className="w-full items-start justify-start gap-1 flex mt-2">
          <WarningIcon className="stroke-white fill-rose-500 dark:stroke-lightBlack w-5 h-5"/>
          <span className="font-main text-sm text-rose-500">
            {errorMessage}
          </span>
        </div>
      }


      <div className="flex w-full"> 
        <button 
          className={`
            ${loading ?  "bg-gray cursor-not-allowed shadow-gray/40" 
            : 
            "bg-Primary  relative shadow-Primary/40 shadow-md   hover:bg-royalBlue hover:shadow-royalBlue/40 hover:shadow-xl  active:bg-blue-800  active:shadow-blue-800/40"}
            flex justify-center items-center font-main w-full h-12 rounded-xl text-white transition-all duration-150 ease-in-out gap-2
          `}          
          onClick={handleSubmit}
          disabled={loading}
          >
            {loading &&
              <div className="w-4 h-4 ">
                <SpinnerIcon /> 
              </div>
            }
            <span>{loading ? "Checking..." : "Reset"}</span>
        </button>
      </div>

    </div>
  )
}

export default ForgotPasswordNewPassword