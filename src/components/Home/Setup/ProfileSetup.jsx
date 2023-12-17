import { uploadAvatarImage } from '../../../redux/actions/UploadAction.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone'; 
import { useEffect, useState } from 'react';
import { setupProfile } from '../../../redux/actions/UserAction.ts'
import { generateBio } from '../../../redux/api/UserRequest.ts';
import { useParams } from 'react-router-dom'
import CameraIcon from '../../../icons/CameraIcon.jsx'
import expertise from '../../../constants/Expertise.ts';
import skills from '../../../constants/Skills.ts';
import Dropdown from '../../global/Dropdown.jsx';
import MultiSelect from '../../global/MultiSelect.jsx';
import GenerateIcon from '../../../icons/GenerateIcon.jsx';
import PageLoader from '../../global/PageLoader.jsx';
import { Avatars } from '../../../constants/DefaultAvatars.ts'

const ProfileSetup = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const { userInformation } = useSelector((state) => state.authReducer.userData)
  const [ position, setPosition] = useState('');
  const [ abilities, setAbilities] = useState([]);
  const [ profile , setProfile ] = useState([])
  const [ preview, setPreview ] = useState('') 
  const [ text, setText ] = useState('');
  const [ timer, setTimer ] = useState(60)
  const [ loading, setLoading ] = useState(false)
  const [ generating, setGenerating ] = useState(false)
  const filteredSkills  = skills.filter((skill) => skill.category === position.category);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
    setProfile({ file: acceptedFiles[0], url: URL.createObjectURL(acceptedFiles[0]) });

  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
  
    const newInformationData = {
      currentUserId: userInformation._id,
      profilePicture: '', 
      expertise: position.name,
      bio: text,
      skills: abilities,
    };
    const data = new FormData();
    data.append("my_file", profile.file);

    try {
      if(profile.file){
        dispatch(uploadAvatarImage(data))
        .then((imageObject) => {
          newInformationData.profilePicture = imageObject.data;
          dispatch(setupProfile(id, newInformationData));
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        })
      }else{
        if (!newInformationData.profilePicture){
          const randomIndex = Math.floor(Math.random() * Avatars.length);
          newInformationData.profilePicture = Avatars[randomIndex]
        }
        dispatch(setupProfile(id, newInformationData));
      }
      
      setProfile([]);
      setAbilities([]);
      setText('');
      setPosition('');
      setPreview('')

      } catch (error) {
        console.error('Error:', error);
      }
  };

  const handleGenerate = () =>{
    if(abilities.length > 0 && position){    
      generateBio({
        expertise: position.name, 
        skills: abilities
      })
      .then((response)=>{
        setText(response)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    setGenerating(true)
  }

  useEffect(() => {
    if(generating){
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000);
      if (timer === 0){
        setGenerating(false)
        setTimer(60)
      }
      return () => {
        clearInterval(interval)
      }
    }
  }, [generating, timer])
  

  useEffect(() => {
    return() =>{
      setLoading(false)
    }
  },[])

  if(loading){
    return <PageLoader />
  }


  return (
    <div className="z-10 bg-white dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray rounded-3xl w-[42rem]">
      <div className="w-42 h-42 py-8 flex flex-col px-8">
        <div className="flex flex-col mb-8">
          <span className="font-main text-2xl font-semibold mb-1 dark:text-white2 dark:font-medium">
            You're almost there!
          </span>
          <span className="font-main text-md text-gray dark:text-darkWhite">Let's start by getting to know each other</span>
        </div>

        <div className="flex items-center justify-center ">

          <div className="flex flex-col items-center justify-center mt-3 outline-none" {...getRootProps()}>
            <div
              className={`flex items-center justify-center  w-40 h-40 rounded-3xl ring-1 ring-lightGray dark:ring-darkGray relative ${
                isDragActive ? 'ring-blue-500 bg-sky-100': 'bg-white dark:bg-lightBlack'
              }`}
            >
              <input {...getInputProps()} />
              {preview ? 
                <img src={preview} className="object-cover w-40 h-40 rounded-3xl" />
                :
                <div className="w-12 h-12">
                  <CameraIcon color="fill-darkBlue stroke-white dark:fill-white2 dark:stroke-lightBlack"/>
                </div>
              }
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="ml-12 flex flex-col gap-2">
              <span className="font-main text-md font-semibold text-darkBlue dark:text-darkWhite dark:font-medium">Choose your expertise</span>
              <Dropdown options={expertise} name="Choose your expertise" state={position} setState={setPosition} clear={setAbilities}/>
            </div>

            <div className="ml-12 flex flex-col mt-4 gap-2">
              <span className="font-main text-md font-semibold text-darkBlue dark:text-darkWhite dark:font-medium">Select your skills</span>
              <MultiSelect options={filteredSkills} name="Select your skills" state={abilities} setState={setAbilities}/>
            </div>
          </div>
        </div>


        <div className="flex flex-col relative gap-2 mt-4">
          <div className="flex justify-between">
            <span className="font-main text-md font-semibold text-darkBlue dark:text-darkWhite dark:font-medium">Add about me</span>
            { abilities.length > 0 && position && (
              <>
                <div className="flex items-center gap-2">
                  {generating && <span className="text-sm text-green-500 font-main">{timer}s</span>}
                  <button 
                    className={`relative flex item-center justify-center w-8 h-8 rounded-xl 
                    ${generating ? 'bg-gray cursor-not-allowed' :'bg-green-500 cursor-pointer'}`}
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    <div className="w-8 h-8 p-2">
                      <GenerateIcon />
                    </div>
                  </button> 
                </div>
              </>
            )}
          </div>

          <textarea
            className={`font-main ring-1 min-h-[8rem] ring-lightGray dark:ring-darkGray dark:bg-lightBlack outline-none bg-white dark:text-white2 dark:placeholder:text-darkWhite rounded-lg py-2 px-4 flex-1 resize-none ` }
            placeholder="Tell us about yourself"
            maxLength={1024}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>

        <div className="items-center justify-end flex mt-12">
          <button 
          className={`${loading || !position || !text || !abilities ? "bg-gray dark:darkWhite ": "bg-Primary shadow-Primary"} font-main  w-40 shadow-3xl  rounded-xl py-2 px-4 text-white text-center cursor-pointer`}
          onClick={handleSubmit}
          disabled={loading || !position || !text || !abilities }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;