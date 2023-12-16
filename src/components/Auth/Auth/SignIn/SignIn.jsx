import { useState } from "react"
import SignInCredentials from "./SignInCredentials.jsx"
import SignInVerification from "./SignInVerification.jsx"
import ForgotPasswordEmail from "./ForgotPasswordEmail.jsx"
import ForgotPasswordVerification from './ForgotPasswordVerification.jsx'
import ForgotPasswordNewPassword from "./ForgotPasswordNewPassword.jsx"
const SignIn = ({ setShowSignIn }) => {
  const [ togglePage, setTogglePage ] = useState("SignInCredentials")
  const [ userId, setUserId ] = useState("")
  const [ email, setEmail ] = useState("")
  return (
    <div>
      { togglePage === "SignInVerification" && <SignInVerification userId={userId} email={email}/>}
      { togglePage === "SignInCredentials" && <SignInCredentials setShowSignIn={setShowSignIn} setTogglePage={setTogglePage} setUserId={setUserId} email={email} setEmail={setEmail} />}
      { togglePage === "ForgotPasswordEmail" && <ForgotPasswordEmail setTogglePage={setTogglePage} email={email} setEmail={setEmail} setUserId={setUserId}/>}
      { togglePage === "ForgotPasswordVerification" && <ForgotPasswordVerification setTogglePage={setTogglePage} userId={userId} email={email}/>}
      { togglePage === "ForgotPasswordNewPassword" && <ForgotPasswordNewPassword setTogglePage={setTogglePage} userId={userId} setEmail={setEmail}/>}
    </div>
  )
}

export default SignIn