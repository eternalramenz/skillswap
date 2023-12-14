import { useFocusTrap } from "@mantine/hooks";
import { useDropzone } from 'react-dropzone';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPortfolio } from '../../../../../redux/api/ProfileRequest.ts'
import { uploadPortfolioImages, uploadPortfolioThumbnail } from '../../../../../redux/api/UploadRequest.ts'
import MultiSelect from "../../../../global/MultiSelect.jsx"
import ImageIcon from '../../../../../icons/ImageIcon.jsx'
import CloseIcon from '../../../../../icons/CloseIcon.jsx'
import DownArrowIcon from '../../../../../icons/DownArrowIcon.jsx'
import UpArrowIcon from '../../../../../icons/UpArrowIcon.jsx'
import TrashIcon from '../../../../../icons/TrashIcon.jsx'
import tagsList from '../../../../../constants/Tags.ts'

const CreatePortfolioDrawer = ({ setOpenPortfolioDrawer, openCreateDrawer, }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { userInformation } = useSelector((state) => state.authReducer.userData)
  const [ uploadedFiles, setUploadedFiles] = useState([]); 
  const [ preview, setPreview] = useState([]); 
  const [ thumbnail, setThumbnail] = useState([])
  const [ thumbnailPreview, setThumbnailPreview ] = useState('')
  const [ tags, setTags] = useState([])
  const [ description, setDescription ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ loading ,setLoading ] = useState(false)

  const focusTrapRef = useFocusTrap(openCreateDrawer);

  const clearForm = () => {
    setUploadedFiles([])
    setDescription('')
    setThumbnailPreview('')
    setPreview([])
    setThumbnail('')
    setTags([])
    setDescription('')
    setTitle('')
  }

  const onImagesDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const newFiles = [...uploadedFiles];
      const newPreviews = [...preview];

      imageFiles.forEach((file) => {
        newFiles.push(file);

        // Read the image as data URL
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result);
          setPreview(newPreviews);
        };
        reader.readAsDataURL(file);
      });

      setUploadedFiles(newFiles);
    }
  };

  const onThumbnailDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
    setThumbnail({ file: acceptedFiles[0], url: URL.createObjectURL(acceptedFiles[0]) });
  }

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
    isDragActive: isImagesDragActive,
  } = useDropzone({
    onDrop: onImagesDrop,
    multiple: true,
  });

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
    isDragActive: isThumbnailDragActive,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    multiple: false, 
  });


  const handleRemoveImage = (index) => {
    const newFiles = [...uploadedFiles];
    const newPreviews = [...preview];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setUploadedFiles(newFiles);
    setPreview(newPreviews);
  };

  const handleMoveImageUp = (index) => {
    if (index > 0) {
      const newFiles = [...uploadedFiles];
      const newPreviews = [...preview];

      const tempFile = newFiles[index];
      newFiles[index] = newFiles[index - 1];
      newFiles[index - 1] = tempFile;

      const tempPreview = newPreviews[index];
      newPreviews[index] = newPreviews[index - 1];
      newPreviews[index - 1] = tempPreview;

      setUploadedFiles(newFiles);
      setPreview(newPreviews);
    }
  };

  const handleMoveImageDown = (index) => {
    if (index < uploadedFiles.length - 1) {
      const newFiles = [...uploadedFiles];
      const newPreviews = [...preview];

      const tempFile = newFiles[index];
      newFiles[index] = newFiles[index + 1];
      newFiles[index + 1] = tempFile;

      const tempPreview = newPreviews[index];
      newPreviews[index] = newPreviews[index + 1];
      newPreviews[index + 1] = tempPreview;

      setUploadedFiles(newFiles);
      setPreview(newPreviews);
    }
  };

  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    setLoading(true)
    const newPortfolioData = {
      userId: userInformation._id,
      title: title,
      description: description,
      tags: tags,
      images: [],
      thumbnail:""
    }

    const imageUploadPromises = uploadedFiles.map(async (images) => {
      const data = new FormData();
      data.append("my_file", images);
      return uploadPortfolioImages(data);
    });
    
    try {
      const imageObjects = await Promise.all(imageUploadPromises);
      imageObjects.forEach((imageObject) => {
        newPortfolioData.images.push(imageObject.data);
      });
    } catch (error) {
      console.error(error);
    }

    const data = new FormData();
    data.append("my_file", thumbnail.file);
    try {
      const res = await uploadPortfolioThumbnail(data)
      newPortfolioData.thumbnail = res.data;
    } catch (error) {
      console.log(error)
    }
    uploadPortfolio(newPortfolioData)
    clearForm()
    setOpenPortfolioDrawer(false)   
    setLoading(false)
    queryClient.invalidateQueries(['portfolio']);
  }
  
  useEffect(()=>{
    return ()=>{
      queryClient.invalidateQueries(['portfolio']);
    }
  },[loading])
  

  const isDisabled = uploadedFiles.length < 1 || !thumbnailPreview || !title || !description || tags.length < 1

  return (
    <>
      {openCreateDrawer && (
        <div
          aria-hidden={true}
          className="dark:bg-black/70 w-full h-full fixed z-40 backdrop-blur-sm bg-black/40 transition-all duration-300 ease-in-out"
          onClick={() => setOpenPortfolioDrawer((prev) => !prev)}
        ></div>
      )}
      <div
        className={`${
          openCreateDrawer ? 'translate-y-0' : 'translate-y-full'
        } xl:h-[90%] transition-transform overflow-y-scroll duration-300 ease-in-out bg-white2 bottom-0 -right-0 overflow-x-hidden fixed h-full w-full z-40 dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray backdrop-blur-md`}
        ref={focusTrapRef}
      >
        <div className="flex justify-center gap-8">
          <div className=" flex flex-col items-center justify-start h-full w-[50%]  mt-8">
            <div className="flex justify-end items-center w-full mb-12">
            </div>

            <div className="w-full flex flex-col  bg-white rounded-xl p-4 ring-1 ring-gray/40 dark:bg-transparent  dark:ring-darkGray">
              <span className="font-main text-darkBlue font-medium text-sm dark:text-white2 mb-2 ">Title </span>
              <div className="bg-white ring-1 ring-gray/40 rounded-xl p-4 dark:bg-transparent dark:ring-darkGray">
                <input 
                  onChange={(e)=> setTitle(e.target.value)}
                  type="text" 
                  placeholder="Title" 
                  className="bg-transparent font-main text-xl outline-none w-full  dark:text-white2 dark:placeholder:text-darkWhite"
                  maxLength={64}
                  disabled={loading}
                />
              </div>
              
              <span className="font-main text-darkBlue font-medium text-sm dark:text-white2 mb-2 mt-4">Description </span>
              <div className="bg-white ring-1 ring-gray/40 rounded-xl p-4 dark:bg-transparent dark:ring-darkGray">                
                <textarea 
                  placeholder="Tell us about your work, your inspirations, and the stories behind your creations." 
                  className="bg-transparent font-main text-md outline-none resize-none w-full  dark:text-white2 dark:placeholder:text-darkWhite"  
                  onInput={autoResize}
                  maxLength={2048}
                  onChange={(e)=> setDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              <span className="font-main text-darkBlue font-medium text-sm dark:text-white2 mb-2 mt-4">Tags </span>
              <MultiSelect options={tagsList} name="Select tags for your project" state={tags} setState={setTags} />
            
            
            
          
            </div>

            <div className="w-full relative mt-4">
              {preview.map((dataURL, index) => (
                <div key={index} className="relative ">
                  <img src={dataURL} alt="" className="w-full rounded-2xl mt-4" />
                  <div className="w-8 rounded-xl absolute  top-0 -right-12 bg-white ring-1 ring-lightGray shadow-2xl shadow-gray dark:bg-lightBlack dark:ring-darkGray dark:shadow-darkWhite">
                    <button className="w-8 h-8 flex items-center justify-center p-2" onClick={()=>handleRemoveImage(index)}>
                      <TrashIcon />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center p-2" onClick={()=>handleMoveImageUp(index)}>
                      <UpArrowIcon />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center p-2" onClick={()=>handleMoveImageDown(index)}>
                      <DownArrowIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex w-full items-center justify-center rounded-2xl cursor-pointer  ">
              <div {...getImagesRootProps()} className="w-full h-full flex items-center justify-center">
                <input {...getImagesInputProps()} />
                {isImagesDragActive ? (
                  <div className="py-[12.5rem] flex justify-center items-center ring-1 ring-Primary text-Primary rounded-2xl w-full  bg-skyBlue mt-4">
                    <p>Drag here</p>
                  </div>
                ) : (

                  <div className="py-32 flex justify-center items-center  rounded-2xl w-full  bg-skyBlue flex-col dark:bg-blue-800/20 mt-4 ring-1 ring-royalBlue">
                    <div className="w-20 h-20 mb-8">
                      <ImageIcon/>
                    </div>
                    <span className="font-main text-darkBlue font-medium text-xl dark:text-white2">Drag and drop an image, or Browse</span>
                    <span className="font-main text-sm mt-2 text-royalBlue dark:text-darkWhite">Minimum 1600px width recommended. Max 10MB each</span>
                  </div>
                )}
              </div>
              
            </div>

            <div className="w-full h-12  mt-4 text-transparent"></div>
  
          </div>
          <div className="w-[15%] flex flex-col ">
            <div className="flex items-end justify-end flex-col ">
              <button 
                className="mt-8 w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
                onClick={() => setOpenPortfolioDrawer((prev) => !prev)}
              >
                <CloseIcon />
              </button>
              <div className="w-full h-full bg-white rounded-xl mt-4 ring-1 ring-gray/40 p-4 dark:bg-transparent dark:ring-darkGray">
                <span className="font-main text-darkBlue font-medium text-sm dark:text-white2">Portfolio Thumbnail </span>
                <span className="font-main text-gray font-medium text-sm dark:text-darkWhite">(required)</span>
                <div className={`w-full h-32 ring-1 rounded-lg mt-4 ring-gray/40 flex items-center justify-center object-cover bg-skyBlue dark:bg-blue-800/20 ${ thumbnail ? 'ring-gray/40 dark:ring-darkGray' : 'ring-royalBlue'}`} {...getThumbnailRootProps()}>
                  <input {...getThumbnailInputProps()} />
                  {isThumbnailDragActive ? (
                    <span className="text-sm ">Drop here</span>
                  ) : (
                    thumbnail.url ? (
                      <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full rounded-lg object-cover" />
                    ) : (
                      <div className="flex-col flex items-center justify-center gap-2">
                        <span className=" w-full  text-royalBlue font-main text-sm rounded-xl  items-center flex justify-center font-medium dark:text-white2">Select an Image</span>
                        <span className=" w-full text-royalBlue font-main text-xs rounded-xl  items-center flex justify-center  dark:text-darkWhite">Minimum 1000px, Max 5MB</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end w-full my-4 gap-2 ">
              <button disabled={loading} className="w-12 text-darkBlue py-2 px-12 items-center flex justify-center dark:text-white" onClick={() => setOpenPortfolioDrawer((prev) => {!prev; clearForm()})}>Cancel</button>
              <button disabled={loading || isDisabled} className={`w-full ${isDisabled || loading ? 'bg-gray shadow-gray' : 'bg-Primary shadow-Primary' } text-white font-main text-sm rounded-xl py-2 px-12 items-center flex justify-center shadow-2xl `} onClick={handleSubmit}>Create</button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CreatePortfolioDrawer;
