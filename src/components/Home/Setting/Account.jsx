import { formatDateWithOrdinalNumber } from '../../../constants/DateConverters.ts'
import React, { useState } from 'react'
import { updateAccount } from '../../../redux/api/UserRequest.ts'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQueryClient} from '@tanstack/react-query'
import Colors from '../../../constants/Colors.ts'
import expertises from '../../../constants/Expertise.ts';
import locations from '../../../constants/Locations.ts';
import skills from '../../../constants/Skills.ts';
import BirthDatePicker from '../../global/BirthDatePicker.jsx';
import Dropdown from '../../global/Dropdown.jsx';
import MultiSelect from '../../global/MultiSelect.jsx';

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state)=>state.authReducer.userData);
  
  const [ newFirstName, setNewFirstName ] = useState(userInformation.firstName);
  const [ newLastName, setNewLastName ] = useState(userInformation.lastName);
  const [ newDateOfBirth, setNewDateOfBirth ] = useState(userInformation.dateOfBirth);
  const [ formattedDate, setFormattedDate ] = useState(formatDateWithOrdinalNumber( new Date (userInformation.dateOfBirth)));
  const [ newAddress, setNewAddress ] = useState(userInformation.address);
  const [ newPosition, setNewPosition ] = useState(userInformation.expertise);
  const [ newSkills, setNewSkills ] = useState(userInformation.skills);
  const [ newBio, setNewBio] = useState(userInformation.bio);

  const filteredSkills = skills.filter((skill) => skill.category === newPosition.category);

  const generateRandomColors = () => {
    for (let i = Colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [Colors[i], Colors[j]] = [Colors[j], Colors[i]];
    }

    return Colors;
  };

  const handleSubmit = async () =>{
    const newAccountData = {
      firstName: newFirstName,
      lastName: newLastName,
      address: newAddress.name,
      dateOfBirth: newDateOfBirth,
      expertise: newPosition.name,
      skills: newSkills,
      bio: newBio
    }
    try {
      const res = await updateAccount(userInformation._id, newAccountData)
      dispatch({type:"UPDATE_ACCOUNT", data:res.data})
      navigate(`/profile/${userInformation._id}`)
      queryClient.removeQueries(['profileInfo'])
      queryClient.invalidateQueries(['accountInformation'])
    } catch (error) {
      console.log(error)
    }
  } 

  const badgeColors = generateRandomColors();
  
  const isDisabled = !newFirstName || !newLastName || !newAddress || !newDateOfBirth || !newPosition || !newSkills || !newBio
  

  return (
    <div className="w-full flex flex-col gap-6 ">
      <div className="w-full">
        <div className="flex items-start">
          <span className="text-xl font-main text-darkBlue font-semibold dark:text-white2 ">Personal</span>
        </div>
        <div className="flex mt-4 gap-12">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex flex-col">
              <span className="font-main text-sm text-gray dark:text-darkWhite">First Name</span>
              <input 
                value={newFirstName}
                className="dark:bg-lightBlack dark:ring-darkGray dark:placeholder:text-darkWhite mt-1 font-normal p-2 placeholder:font-normal placeholder:text-sm ring-1 font-main text-md dark:font-normal text-darkBlue dark:text-white2 border-none outline-none rounded-md ring-lightGray"
                placeholder="Shad"
                onChange={(e)=>setNewFirstName(e.target.value)}
              />
            </div>

            <div className="h-10 w-full  flex flex-col">
              <span className="font-main text-sm text-gray dark:text-darkWhite">Date of Birth</span>
              <BirthDatePicker setSelectedDate={setNewDateOfBirth} selectedDate={newDateOfBirth} setFormattedDate={setFormattedDate} formattedDate={formattedDate}/>
            </div>
            <div className="flex flex-col mt-4">
              <span className="font-main text-sm text-gray dark:text-darkWhite mb-1">Expertise</span>
              <Dropdown options={expertises} name="Software Developer" state={newPosition} setState={setNewPosition} clear={setNewSkills}/>
              </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2 ">
            <div className="flex flex-col">
              <span className="font-main text-sm text-gray dark:text-darkWhite">Last Name</span>
              <input 
                value={newLastName}
                className="dark:bg-lightBlack dark:ring-darkGray dark:placeholder:text-darkWhite mt-1 p-2 font-normal placeholder:font-normal placeholder:text-sm ring-1 font-main text-md dark:font-normal text-darkBlue dark:text-white2  border-none outline-none rounded-md ring-lightGray"
                placeholder="Cn"
                onChange={(e)=>setNewLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-main text-sm text-gray dark:text-darkWhite">Address</span>
              <div className="mt-1">
                <Dropdown options={locations} name="Tokyo, Japan" state={newAddress} setState={setNewAddress} clear={()=>{}} />
              </div>
            </div>

            <div className="">
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-8">
        <span className="text-xl font-main text-darkBlue font-semibold dark:text-white2 ">About me</span>
        <div className="flex flex-col gap-4 w-full mt-4">


          <div className="flex flex-col">
            <span className="font-main text-sm text-gray dark:text-darkWhite">Skills</span>
            <div className="min-w-1/3  mt-1">
              <MultiSelect options={filteredSkills} name="Cooking, Coding, Writing" state={newSkills} setState={setNewSkills}/>
            </div>
          </div>

          <div className="flex flex-col w-full ">
            <span className="font-main text-sm text-gray dark:text-darkWhite">Bio</span>
            <div className="w-full mt-1">
              <textarea 
                value={newBio}
                className="w-full overflow-x-hidden resize-none dark:bg-lightBlack dark:ring-darkGray dark:placeholder:text-darkWhite mt-1 p-2 font-normal placeholder:font-normal placeholder:text-sm ring-1 font-main text-md dark:font-normal text-darkBlue dark:text-white2  border-none outline-none rounded-md ring-lightGray"
                placeholder="I love database!"
                rows={10}
                maxLength={2048}
                onChange={(e)=>setNewBio(e.target.value)}
              />
            </div>
          </div>

          <div className="gap-2  h-16 w-full flex items-center justify-end">
            <button 
              disabled={isDisabled}
              className={`${isDisabled ? 'cursor-not-allowed bg-gray': 'bg-Primary '} w-28 py-2 rounded-lg text-white` }
              onClick={handleSubmit}
            >Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account