import { useState } from 'react'
import SignUpCredentials from './SignUpCredentials.jsx'
import SignUpInformation from './SignUpInformation.jsx'
import SignUpVerification from './SignUpVerification.jsx'

const SignUp = ({setShowSignIn}) => { 


  const [ userId, setUserId ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ dateOfBirth, setDateOfBirth ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")



  const newSignUpData = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    address: address.name,
    dateOfBirth: dateOfBirth,
    didSetupProfile: false,
  }
  
  const [showEmail, setShowEmail ] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [ showVerify, setShowVerify ] = useState(false);

  const handleEmailNext = () =>{
    setShowEmail(false)
    setShowPassword(true)
  }

  const handlePasswordBack = () =>{
    setShowEmail(true)
    setShowPassword(false)
  }




  return (
    <>
      <div className={`$slide-left ${showPassword ? null :'slide-right'}`}>
        {showEmail  && 
          <SignUpCredentials 
            setShowSignIn={setShowSignIn}
            handleEmailNext={handleEmailNext}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        }
      </div>
      <div className={`$slide-left ${showPassword ? null :'slide-right'}`}>
        {showPassword && 
          <SignUpInformation
            handlePasswordBack={handlePasswordBack}
            setShowVerify={setShowVerify}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            newSignUpData={newSignUpData}
            setShowPassword={setShowPassword}
            setUserId={setUserId}
          />
        }
      </div>
      <div>
        {showVerify && 
          <SignUpVerification userId={userId} email={email} setShowPassword={setShowPassword} setShowEmail={setShowEmail} setShowVerify={setShowVerify}/> 
        } 
      </div>
  </>
  )
}

export default SignUp