import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { changePassword } from '../../../redux/api/AuthRequest.ts'
import { fetchInformation } from '../../../redux/api/UserRequest.ts';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import zxcvbn from 'zxcvbn';
import EyeIcon from '../../../icons/EyeIcon.jsx'
import EyeOffIcon from '../../../icons/EyeOffIcon.jsx'

const Security = () => {
  const { userInformation } = useSelector((state)=>state.authReducer.userData)

  const [ oldPassword, setOldPassword ] = useState('')
  const [ newPassword, setNewPassword] = useState('');
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ isOldPasswordVisible, setIsOldPasswordVisible ] = useState(false);
  const [ isNewPasswordVisible, setIsNewPasswordVisible ] = useState(false);
  const [ passwordDoNotMatch, setPasswordDoNotMatch ] = useState(false)
  const [ oldPasswordIsIncorrect, setOldPasswordIsIncorrect ] = useState(false)
  const [ oldPasswordIsTheSame, setOldPasswordIsTheSame ] = useState(false)
  const [ passwordChanged, setPasswordChanged ] = useState(false)
  const [ isTyping, setIsTyping] = useState(false);
  const [ isLoading , setIsLoading ] = useState(false)

  useEffect(() => {
    setPasswordDoNotMatch(false);
  }, [newPassword]);

  const handleOldPasswordChange = (e) => {
    const oldPasswordValue = e.target.value;
    setOldPassword(oldPasswordValue.replace(/\s/g, ''));
    setOldPasswordIsIncorrect(false)
    setOldPasswordIsTheSame(false)
    setPasswordChanged(false)
  };
  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue.replace(/\s/g, ''));
    setPasswordDoNotMatch(newPasswordValue !== confirmPassword);
    setOldPasswordIsTheSame(false)
    setOldPasswordIsIncorrect(false)
    setOldPasswordIsTheSame(false)
    setIsTyping(true);

  };
  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue.replace(/\s/g, ''));
    setPasswordDoNotMatch(confirmPasswordValue !== newPassword);
    setOldPasswordIsTheSame(false)
    setOldPasswordIsIncorrect(false)
    setOldPasswordIsTheSame(false)
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prev)=>!prev);
  };

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible((prev)=>!prev);
  };

  const passwordStrength = isTyping ? zxcvbn(newPassword) : { score: 0 };

  const handleSubmit = async () => {
    if (oldPassword === null || oldPassword === "" || 
      newPassword === null || newPassword === "" || 
      confirmPassword === null || confirmPassword === "") {
      return null;
    }

    if (newPassword !== confirmPassword) {
      setPasswordDoNotMatch(true);
      return null; 
    }
    setIsLoading(true)
    const newPasswordData = {
      userId: userInformation._id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }

    try {
      const res = await changePassword(newPasswordData)
      console.log(res)
      if (res.status === 200){
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setPasswordChanged(true)
      }
      if (res.status  === 203){
        setOldPasswordIsIncorrect(true)
      }
      if (res.status  === 204){
        setOldPasswordIsTheSame(true)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const fetchAccount = async () => { 
    const { data } = await fetchInformation(userInformation._id)
    return data.userAccount[0];
  }

  const { data, status } = useQuery(['accountInformation', userInformation._id], fetchAccount);

  if (status === 'loading') return null



  return (
    <div className="w-full flex flex-col gap-6 ">
      <div className="w-full">
        <div className="flex items-center">
          <span className="text-xl font-main text-darkBlue font-semibold dark:text-white2 ">Credentials</span>
        </div>
        <div className="flex mt-4 gap-12">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex flex-col">
              <span className="font-main text-sm text-gray dark:text-darkWhite">Email</span>
              <span className="font-main text-md font-medium dark:font-normal text-darkBlue dark:text-white2">{data?.credentialsData.email}</span>
            </div>
            <div className="flex items-center mt-6">
              <span className="text-xl font-main text-darkBlue font-semibold dark:text-white2 ">Password</span>
            </div>
            <div className="flex flex-col">
              <span className="font-main text-sm text-gray dark:text-darkWhite">Old Password</span>
              <div className="relative  mt-1">
              <input
                type={isOldPasswordVisible ? 'text' : 'password'}
                className="dark:bg-lightBlack w-full dark:ring-darkGray dark:placeholder:text-darkWhite  p-2 font-normal placeholder:font-normal placeholder:text-sm ring-1 font-main text-md dark:font-normal text-darkBlue dark:text-white2 border-none outline-none rounded-md ring-lightGray"
                maxLength={40}
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />
              <div className=" w-5 h-5 absolute top-2.5 right-2 cursor-pointer" onClick={toggleOldPasswordVisibility}>
                { isOldPasswordVisible ? <EyeIcon color="stroke-darkBlue dark:stroke-white2"/> : <EyeOffIcon color="stroke-darkBlue dark:stroke-white2"/>}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-main text-sm text-gray dark:text-darkWhite">New Password</span>
            <div className="relative mt-1">
              <input
                type={isNewPasswordVisible ? 'text' : 'password'}
                className="dark:bg-lightBlack w-full dark:ring-darkGray dark:placeholder:text-darkWhite  p-2 font-normal placeholder:font-normal placeholder:text-sm ring-1 font-main text-md dark:font-normal text-darkBlue dark:text-white2 border-none outline-none rounded-md ring-lightGray"
                maxLength={40}
                value={newPassword}
                onBlur={() => setIsTyping(false)}
                onChange={handleNewPasswordChange}
              />
              <div className=" w-5 h-5 absolute top-2.5 right-2 cursor-pointer" onClick={toggleNewPasswordVisibility}>
                { isNewPasswordVisible ? <EyeIcon color="stroke-darkBlue dark:stroke-white2"/> : <EyeOffIcon color="stroke-darkBlue dark:stroke-white2"/>}
              </div>
            </div>
            { isTyping &&
              <div className="flex items-center mt-2 gap-2 w-11/12 ">
                <div className={`flex-grow h-1 ${passwordStrength.score >= 0 ?'bg-rose-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
                <div className={`flex-grow h-1 ${passwordStrength.score >= 2 ?'bg-yellow-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
                <div className={`flex-grow h-1 ${passwordStrength.score >= 4 ?'bg-green-500'  :'bg-lightGray dark:bg-darkGray'} rounded-sm`}/>
                  {passwordStrength.score >= 0 && passwordStrength.score < 1 && <span className="w-24 text-center font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Weak</span>}
                  {passwordStrength.score >= 1 && passwordStrength.score < 2 && <span className="w-24 text-center font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Very Weak</span>}
                  {passwordStrength.score >= 2 && passwordStrength.score < 3 && <span className="w-24 text-center font-main text-xs text-yellow-500 dark:text-yellow-500 dark:font-normal mt-1">Moderate</span>}
                  {passwordStrength.score >= 3 && passwordStrength.score < 4 && <span className="w-24 text-center font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Strong</span>}
                  {passwordStrength.score >= 4 && <span className="w-24 text-center font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Very Strong</span>}
              </div>
            }
          </div>

          <div className="flex flex-col">
            <span className="font-main text-sm text-gray dark:text-darkWhite">Confirm Password</span>
            <div className="relative  mt-1">
              <input
                type={isNewPasswordVisible ? 'text' : 'password'}
                className="dark:bg-lightBlack w-full dark:ring-darkGray dark:placeholder:text-darkWhite  p-2 font-normal placeholder:font-normal placeholder:text-sm ring-1 font-main text-md dark:font-normal text-darkBlue dark:text-white2 border-none outline-none rounded-md ring-lightGray"
                maxLength={40}
                value={confirmPassword}
                onBlur={() => setIsTyping(false)}
                onChange={handleConfirmPasswordChange}
              />
              <div className=" w-5 h-5 absolute top-2.5 right-2 cursor-pointer" onClick={toggleNewPasswordVisibility}>
                { isNewPasswordVisible ? <EyeIcon color="stroke-darkBlue dark:stroke-white2"/> : <EyeOffIcon color="stroke-darkBlue dark:stroke-white2"/>}
              </div>
            </div>
            {passwordDoNotMatch && <span className=" text-left font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Password do not match</span>}
            {oldPasswordIsIncorrect && <span className=" text-left font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">Password is incorrect</span>}
            {oldPasswordIsTheSame && <span className=" text-left font-main text-xs text-rose-500 dark:text-rose-500 dark:font-normal mt-1">You cannot use your old password</span>}
            {passwordChanged && <span className=" text-left font-main text-xs text-green-500 dark:text-green-500 dark:font-normal mt-1">Password changed successfully</span>}
          </div>
        </div>
      </div>
      </div>
      
      <div className="gap-2  h-16  flex items-center justify-end w-1/2">
        <button 
          className={`${!newPassword || !oldPassword || !confirmPassword || newPassword !== confirmPassword || isLoading ? 'dark:bg-darkGray bg-lightGray cursor-not-allowed': 'bg-Primary'} w-28 py-2 rounded-lg text-white`}
          onClick={handleSubmit} 
          disabled={!newPassword || !oldPassword || !confirmPassword || newPassword !== confirmPassword || isLoading }
        >
          Save
        </button>
      </div>




  </div>
  )
}

export default Security