import { useState, useRef} from 'react'
import { useDispatch, } from 'react-redux'
import { localSignIn } from '../../../../redux/api/AuthRequest.ts'
import SpinnerIcon from '../../../../icons/SpinnerIcon.jsx';
import WarningIcon from  '../../../../icons/WarningIcon.jsx';
import EyeIcon from '../../../../icons/EyeIcon.jsx'
import EyeOffIcon from '../../../../icons/EyeOffIcon.jsx'
import GeeTest from 'react-geetest-v4';


const SignInCredentials = ({setShowSignIn, setTogglePage, setUserId, email, setEmail }) => {
  const captchaRef = useRef(null);
  const dispatch = useDispatch()
  const [ toggleShow, setToggleShow ] = useState(false)
  const [ password, setPassword ] = useState("")
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ didCaptcha, setDidCaptcha ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const isEmailValid = (email) =>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(email)
  }

  const handleSignIn = async() => {


    if (!password && !email ) {
      setErrorMessage("All fields are required.")
      setEmailError(true)
      setPasswordError(true)
      return null
    }
    
    if ( !email ) {
      setErrorMessage("Email is required.")
      setEmailError(true)
      return null
    }
    if (!password ) {
      setErrorMessage("Password is required.")
      setPasswordError(true)
      return null
    }

    if (!isEmailValid(email)){
      setErrorMessage("Email is not valid.")
      setEmailError(true)
      return null
    }

    if (!didCaptcha){
      captchaRef.current.showCaptcha()    
      return null
    }

    const newSignInData = {
      email: email,
      password: password
    }
    try {
      setLoading(true)
      const res = await localSignIn(newSignInData)
      dispatch({type: "AUTH_SUCCESS", data: res.data})
    } catch (error) {
      if(error.response.status === 400){
        setErrorMessage("Invalid email or password. Please check your credentials and try again.")
        setEmailError(true)
        setPasswordError(true)
        setDidCaptcha(false)
      }else if(error.response.status === 404){
        setErrorMessage("We couldn't find an account with the provided email address. Please make sure you've entered the correct email")
        setEmailError(true)
        setDidCaptcha(false)
      }else if(error.response.status === 403){ 
        setTogglePage("SignInVerification")
        setUserId(error.response.data._id)
        setEmail(email)
      }else if(error.response.status === 401){
        setErrorMessage("Invalid email or password. Please check your credentials and try again.");
        setEmailError(true)
        setPasswordError(true)  
        setDidCaptcha(false)
      }else{
        setErrorMessage("An error occurred while processing your request. Please try again later")
        setDidCaptcha(false)
      }
    }finally{
      setLoading(false)
    }
  }



  return (
    <div className="">
      <div className= " transition ease-in-out duration-300 flex flex-col content-center items-center bg-white p-4 rounded-3xl ring-1 ring-lightGray dark:ring-darkGray w-[25rem] h-auto dark:bg-lightBlack">
        <div className="flex flex-col text-center mt-4">
          <span className="font-main font-bold text-3xl text-darkBlue dark:text-white2">Welcome Back</span>
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">Sign in to start sharing skills</span>
        </div>

        <div className="flex h-12 w-full mt-8">
          <input
            type="text"
            value={email}
            className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray dark:bg-lightBlack  ring-1 dark:ring-darkGray dark:text-white2
            ${emailError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
            focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
            transition ease-in-out duration-300
            `}
            placeholder="Email"
            name="email"
            onChange={(e)=>{setEmail(e.target.value);setPasswordError(false);setEmailError(false);setErrorMessage("")}}
            maxLength={64}
          />
        </div>

        <div className="flex h-12 w-full mt-4 relative">
          <input 
          type={toggleShow ? "text" : "password"}
          value={password}
          className={`dark:placeholder:text-darkWhite placeholder:text-sm font-main outline-none rounded-lg p-5 flex-1 h-12 ring-lightGray bg-white dark:bg-lightBlack ring-1 dark:ring-darkGray dark:text-white2
            ${passwordError ? "border-error text-error border-2 bg-rose-50 ring-[3px] ring-rose-100": "border-white2 text-darkBlue"}
            focus:ring-[4px] focus:ring-sky-100 focus:border-2 focus:border-blue-400 focus:text-darkBlue 
            transition ease-in-out duration-300
            `}
          placeholder="Password" 
          name="password" 
          onChange={(e)=>{setPassword(e.target.value);setPasswordError(false);setEmailError(false);setErrorMessage("")}}
          maxLength={24}
          />
          
          {password && (
            <button className="w-6 h-6 absolute right-4 top-3 cursor-pointer" onClick={()=>setToggleShow((prev)=>!prev)}> 
              {toggleShow ? <EyeIcon color={`${passwordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/> : <EyeOffIcon color={`${passwordError ? 'stroke-rose-500' : 'stroke-darkBlue dark:stroke-white2'}`}/>}
            </button>
          )}
        </div>

        { errorMessage &&
        <div className="w-full items-start justify-start gap-1 flex mt-2">
          <WarningIcon className="stroke-white dark:stroke-lightBlack fill-rose-500 w-5 h-5"/>
          <span className="font-main text-sm text-rose-500">
            {errorMessage}
          </span>
        </div>
        }

        <div className="flex w-full mt-4">
          <button 
            type="submit" 
            className={`
              ${loading ?  "bg-gray cursor-not-allowed shadow-gray/40" 
              : 
              "bg-Primary  relative shadow-Primary/40 shadow-md   hover:bg-royalBlue hover:shadow-royalBlue/40 hover:shadow-xl  active:bg-blue-800  active:shadow-blue-800/40"}
              flex justify-center items-center font-main w-full h-12 rounded-xl text-white transition-all duration-150 ease-in-out gap-2
              `}
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading &&
              <div className="w-4 h-4 ">
                <SpinnerIcon /> 
              </div>
            }
            <span>{loading ? "Verifying..." : "Sign In"}</span>
          </button>
        </div>

          <GeeTest
            ref={captchaRef}
            captchaId={'99051de51d4772cf204ea96629d5cb7c'}
            product={'bind'}
            onSuccess={() => setDidCaptcha(true)}
          >
          </GeeTest>

        <div className="flex items-center mt-4 justify-between w-full">
          {/* <div className="items-center ">
            <CheckBox setState={setCheck} state={check} />
            <span className="font-main text-sm text-darkBlue ml-2 dark:text-white2">Remember me</span>
          </div> */}
          <div className="">
            <span className="font-main text-sm text-gray dark:text-darkWhite">
              Don't have an account? 
              <span 
              className="ml-1 font-main font-semibold text-Primary dark:text-royalBlue cursor-pointer"
              onClick={()=> {
                setShowSignIn(prev => !prev)}
              }>
                Create
              </span>
            </span>
          </div>
          <button className="" onClick={()=>{setEmail(""); setTogglePage("ForgotPasswordEmail")}}>
            <span className="font-main text-sm text-darkBlue dark:text-white2">Forgot password?</span>
          </button>
        </div>




      </div>
    </div>
  )
}

export default SignInCredentials