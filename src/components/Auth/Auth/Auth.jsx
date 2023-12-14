import SignIn from './SignIn/SignIn.jsx';
import SignUp from './SignUp/SignUp.jsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.jsx'
const Auth = () => {
  const { showSignIn, setShowSignIn } = useGlobalContext();


  return (
    <div className="flex items-center justify-center h-screen relative">
      <div>
        {showSignIn ?
          <SignIn setShowSignIn={setShowSignIn}/>
        :
          <SignUp setShowSignIn={setShowSignIn}/>
        }
              

      </div>
    </div>
  );
};

export default Auth;
