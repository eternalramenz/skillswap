import React from 'react'
import ChevronLeft from '../../../../icons/ChevronLeft.jsx'
import WarningIcon from  '../../../../icons/WarningIcon.jsx';
import { useState } from 'react'
import { verifyEmailTaken } from '../../../../redux/api/AuthRequest.ts'
import { validateEmail } from '../../../../constants/Functions.ts';
import EyeIcon from '../../../../icons/EyeIcon.jsx';
import EyeOffIcon from '../../../../icons/EyeOffIcon.jsx';
import zxcvbn from 'zxcvbn';
import SpinnerIcon from '../../../../icons/SpinnerIcon.jsx';

const SignUpCredentials = ({setShowSignIn, email, setEmail, password, setPassword, handleEmailNext, confirmPassword, setConfirmPassword}) => {
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)
  const [ confirmPasswordError , setConfirmPasswordError ] = useState(false)

  const [ passwordToggle, setPasswordToggle ] = useState(false)

  const [ errorMessage, setErrorMessage ] = useState("")
  const [ isTyping, setIsTyping] = useState(false);
  const [ loading, setLoading ] = useState(false)
  const passwordStrength = isTyping ? zxcvbn(password) : { score: 0 };


  const handleSubmit = async () => {
    setIsTyping(false)
    if(!email && !password && !confirmPassword){
      setEmailError(true)
      setPasswordError(true)
      setConfirmPasswordError(true)
      setErrorMessage("All fields are required!")
      return null
    }

    if(!email && !password ){
      setEmailError(true)
      setPasswordError(true)
      setErrorMessage("All fields are required!")
      return null
    }

    if(!password && !confirmPassword){
      setPasswordError(true)
      setConfirmPasswordError(true)
      setErrorMessage("All fields are required!")
      return null
    }

    if(!email && !confirmPassword){
      setEmailError(true)
      setConfirmPasswordError(true)
      setErrorMessage("All fields are required!")
      return null
    }

    if(!email){
      setEmailError(true)
      setErrorMessage("Email is required!")
      return null
    }


    if(!password){
      setPasswordError(true)
      setErrorMessage("Password is required!")
      return null
    }
    if(!confirmPassword){
      setConfirmPasswordError(true)
      setErrorMessage("Confirm Password is required!")
      return null
    }


    if(!validateEmail(email)){
      setEmailError(true)
      setErrorMessage("Email is invalid!")
      return null
    }

    try {
      setLoading(true)
      await verifyEmailTaken(email.toLowerCase())
    } catch (error) {
      setEmailError(true)
      setErrorMessage("Email is already taken")
      return null
    } finally {
      setLoading(false)
    }

    if (password.length < 8) {
      setPasswordError(true);
      setErrorMessage("Password must be at least 8 characters!");
      return null;
    }

    if (!/[!@#$%^&*(),.?"; :{}|<>]/.test(password)) {
      setPasswordError(true);
      setErrorMessage("Password must contain at least one special character!");
      return null;
    }

    if (!/\d/.test(password)) {
      setPasswordError(true);
      setErrorMessage("Password must contain at least one number!");
      return null;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError(true);
      setErrorMessage("Password must contain at least one lowercase letter!");
      return null;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError(true);
      setErrorMessage("Password must contain at least one uppercase letter!");
      return null;
    }

    if(password !== confirmPassword){
      setPasswordError(true)
      setConfirmPasswordError(true)
      setErrorMessage("Password do not match!")
      return null
    }
    handleEmailNext()
  }
  const handleClear = () =>{
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    setErrorMessage("")
  }

  return (
    <div className="flex flex-col ring-1 ring-lightGray dark:ring-darkGray content-center items-center bg-white dark:bg-lightBlack/70  p-4 rounded-3xl  border-white w-[25rem] h-auto">
      <div className="flex items-center justify-center mt-4 w-full">
        <button className="h-16 flex cursor-pointer mr-4 items-center justify-center" onClick={()=>setShowSignIn(prev => !prev)}  >
          <div className="bg-lightGray dark:bg-darkGray w-8 h-8 rounded-lg p-1">
            <ChevronLeft />
          </div>
        </button>
        <div className="flex flex-col w-full ">
          <span className="font-main font-bold text-2xl text-darkBlue dark:text-white2">Create your Account</span>
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">to cotinue using skillswap </span>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 mt-8">
        <div className="flex flex-col gap-4 h-12 w-full ">
          <input 
            type="email"
            autoComplete='off' 
            value={email}
            className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
              ${emailError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
              focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
              transition ease-in-out duration-300
              `}              
            placeholder="Email" 
            name="email" 
            onChange={(e) => {
              setEmail(e.target.value);
              setIsTyping(false)
              handleClear();
            }}        
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-4 h-12 w-full relative">
          <input 
            type={passwordToggle ? "text" : "password"}
            value={password}
            className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
              ${passwordError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
              focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
              transition ease-in-out duration-300
              `}              
            placeholder="Password" 
            onChange={(e) => {
              setPassword(e.target.value);
              setIsTyping(true)
              handleClear();
            }}                
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
            maxLength={24}
          />
          {(password || confirmPassword) && (
            <button className="w-6 h-6 absolute right-4 top-3 cursor-pointer" onClick={()=>setPasswordToggle((prev)=>!prev)}> 
              {passwordToggle ? 
                <EyeIcon color={`${passwordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/> 
              : 
                <EyeOffIcon color={`${passwordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/>
              }
            </button>
          )}
        </div>


        { isTyping &&
          <div className="flex items-center gap-2 w-full h-1">
            <div className={`flex-grow h-1 ${passwordStrength.score >= 0 ?'bg-rose-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
            <div className={`flex-grow h-1 ${passwordStrength.score >= 2 ?'bg-yellow-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
            <div className={`flex-grow h-1 ${passwordStrength.score >= 4 ?'bg-green-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
              {passwordStrength.score >= 0 && passwordStrength.score < 1 && <span className="w-20 text-center font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Weak</span>}
              {passwordStrength.score >= 1 && passwordStrength.score < 2 && <span className="w-20 text-center font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Very Weak</span>}
              {passwordStrength.score >= 2 && passwordStrength.score < 3 && <span className="w-20 text-center font-main text-xs text-yellow-500 dark:text-yellow-500 dark:font-normal mt-1">Moderate</span>}
              {passwordStrength.score >= 3 && passwordStrength.score < 4 && <span className="w-20 text-center font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Strong</span>}
              {passwordStrength.score >= 4 && <span className="w-20 text-center font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Very Strong</span>}
          </div>
        }

        <div className="flex gap-4 h-12 w-full flex-col relative">
          <input 
            type={passwordToggle ? "text" : "password"}
            value={confirmPassword}
            className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
              ${confirmPasswordError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
              focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
              transition ease-in-out duration-300
              `}              
            placeholder="Confirm Password" 
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setIsTyping(false)
              handleClear();
            }} 
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
            maxLength={32}
          />
          {(password || confirmPassword) && (
            <button className="w-6 h-6 absolute right-4 top-3 cursor-pointer" onClick={()=>setPasswordToggle((prev)=>!prev)}> 
            
              {passwordToggle ? 
                <EyeIcon color={`${confirmPasswordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/> 
              :
                <EyeOffIcon color={`${confirmPasswordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/>
              }

            </button>
          )}
        </div>

      </div>
        
      { errorMessage &&
        <div className="w-full items-start justify-start gap-1 flex mt-2">
          <WarningIcon className="stroke-white fill-rose-500 dark:stroke-lightBlack w-5 h-5"/>
          <span className="font-main text-sm text-rose-500">
            {errorMessage}
          </span>
        </div>
      }

      <div className="flex w-full mt-4"> 
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
            <span>{loading ? "Verifying..." : "Verify"}</span>        
          </button>
      </div>


      <div className="mt-8">
        <span className="font-main text-sm text-darkBlue dark:text-white2">
          Already have an account?
          <span 
            className="ml-1 font-main font-semibold text-Primary cursor-pointer"
            onClick={()=>setShowSignIn(prev => !prev)}  
          >
            Sign in
        </span>
        </span>
      </div>
    </div>
  )
}

export default SignUpCredentials