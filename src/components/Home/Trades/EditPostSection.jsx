import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import { uploadPostImage } from '../../../redux/actions/UploadAction.ts';
import { updatePost } from '../../../redux/api/ProfileRequest.ts'
import { useQueryClient } from "@tanstack/react-query";
import ImageIcon from '../../../icons/ImageIcon.jsx'
import TrashIcon from '../../../icons/TrashIcon.jsx'
import CloseIcon from "../../../icons/CloseIcon.jsx";
import DownArrowIcon from '../../../icons/DownArrowIcon.jsx'
import UpArrowIcon from '../../../icons/UpArrowIcon.jsx'

const EditPostSection = ({ data,  setOpenTradeDrawer}) => {
  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state)=> state.authReducer.userData)
  const [ description, setDescription ] = useState(data.description)
  const [ files, setFiles] = useState(data.images); 
  const [ preview, setPreview] = useState(data.images); 
  const dispatch = useDispatch()
  const descriptionRef = useRef()

  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = '20';
    textarea.style.height = textarea.scrollHeight + 'px';
  };


  const onImagesDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const newFiles = [...files];
      const newPreviews = [...preview];

      imageFiles.forEach((file) => {
        newFiles.push(file);

        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result);
          setPreview(newPreviews);
        };
        reader.readAsDataURL(file);
      });

      setFiles(newFiles);
    }
  };

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
    isDragActive: isImagesDragActive,
  } = useDropzone({
    onDrop: onImagesDrop,
    multiple: true,
  });


  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...preview];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreview(newPreviews);
  };

  const handleMoveImageUp = (index) => {
    if (index > 0) {
      const newFiles = [...files];
      const newPreviews = [...preview];

      const tempFile = newFiles[index];
      newFiles[index] = newFiles[index - 1];
      newFiles[index - 1] = tempFile;

      const tempPreview = newPreviews[index];
      newPreviews[index] = newPreviews[index - 1];
      newPreviews[index - 1] = tempPreview;

      setFiles(newFiles);
      setPreview(newPreviews);
    }
  };

  const handleMoveImageDown = (index) => {
    if (index < files.length - 1) {
      const newFiles = [...files];
      const newPreviews = [...preview];

      const tempFile = newFiles[index];
      newFiles[index] = newFiles[index + 1];
      newFiles[index + 1] = tempFile;

      const tempPreview = newPreviews[index];
      newPreviews[index] = newPreviews[index + 1];
      newPreviews[index + 1] = tempPreview;

      setFiles(newFiles);
      setPreview(newPreviews);
    }
  };

  const handleSubmit  = async (e) => {

    const newPostData = {
      tradeId: data.tradeData.tradeId,
      userId: userInformation._id,
      description: descriptionRef.current.value,
      images: [],
    }
    
    const imageUploadPromises = files.map(async (file) => {
      if (typeof file === 'string' && (file.startsWith('http://') || file.startsWith('https://'))) {
        return file;
      } else {
        const data = new FormData();
        data.append("my_file", file);
    
        return dispatch(uploadPostImage(data)); 
      }
    });


    try {
      const imageObjects = await Promise.all(imageUploadPromises);

      imageObjects.forEach((image) => {
        if (typeof image === 'string') {
          newPostData.images.push(image);
        } else {
          newPostData.images.push(image.data);
        }
      });

      descriptionRef.current.value=""
      setOpenTradeDrawer((prev)=>!prev)
      await updatePost(data._id, newPostData)
    } catch (error) {
      console.error(error);
    }
    queryClient.invalidateQueries(['profilePost'])
    queryClient.invalidateQueries(['discoverPosts']);
  }


  return (
    <div className="flex flex-col pl-6 pr-4 py-10 transition-all relative h-full">
      <div className="flex items-center justify-start">          
        <button 
          className=" w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => {setOpenTradeDrawer((prev) => !prev);}}
        >
          <CloseIcon />
        </button>
      </div>


      <div className="flex gap-4  items-center">
        <div className={`ml-1.5 w-4 h-4  ring-[7px] ring-Primary rounded-md bg-transparent mt-12`}></div>
        <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2 mt-12">
          Edit a Post
        </span>
      </div>


      <div className="mt-6 flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
              Description
            </span>
            <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              Share your experience in the world.
            </span>
          </div>
        </div> 
        <div className="my-4 ring-gray/40 dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray  rounded-2xl pb-2 pt-1 px-4">
          <textarea 
            className="font-main mt-2 h-24 bg-transparent w-full outline-none text-sm resize-none  dark:placeholder:text-darkWhite dark:text-white2"
            placeholder="Write your experience in this trade."
            maxLength={500}
            onInput={autoResize}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            ref={descriptionRef}
          />
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">{description.length}/500</span>
        </div>
      </div> 


      <div className=" flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
              Images
            </span>
            <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              Add images by dragging and dropping them here.
            </span>
          </div>
        </div> 
      </div> 

      <div className="w-full relative flex flex-col">
        {preview.map((dataURL, index) => (
          <div key={index} className="flex gap-4 mt-6">
            {files.length > 1 && 
              <div className="w-8 rounded-xl h-24 bg-white ring-1 ring-lightGray shadow-2xl shadow-gray dark:bg-lightBlack dark:ring-darkGray dark:shadow-darkWhite">
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
            }
            <img src={dataURL} alt="" className="w-full rounded-2xl h-[20rem] object-cover" />
          </div>
        ))}
      </div>
      
      <div className="flex w-full items-center justify-center rounded-2xl cursor-pointer mt-2">
        <div {...getImagesRootProps()} className="w-full h-full flex items-center justify-center">
          <input {...getImagesInputProps()} />
          {isImagesDragActive ? (
            <div className="py-[12.5rem] flex justify-center items-center ring-1 ring-Primary text-Primary rounded-2xl w-full bg-skyBlue mt-4">
              <p>Drag here</p>
            </div>
          ) : (

            <div className="py-8 flex justify-center items-center  rounded-2xl w-full bg-skyBlue flex-col dark:bg-blue-800/20 mt-4 ring-1 ring-royalBlue">
              <div className="w-20 h-20 mb-8">
                <ImageIcon/>
              </div>
              <span className="font-main text-darkBlue font-medium text-xl dark:text-white2">Drag and drop an image, or Browse</span>
              <span className="font-main text-sm mt-2 text-royalBlue dark:text-darkWhite">Minimum 1600px width recommended. Max 10MB each</span>
            </div>
          )}
        </div>
        
      </div>



      <div className=' w-full flex-1'></div>
      <div className="w-full items-center justify-end flex mt-12">
        <button className="bg- font-main text-darkBlue  py-2 px-4 dark:text-darkWhite text-sm" onClick={() => {setOpenTradeDrawer((prev)=>!prev)}}>Discard</button>
        <button 
          className={` bg-Primary font-main text-white rounded-lg py-2 px-8 text-sm`}
          onClick={handleSubmit}
        >
          Update
        </button>
      </div> 
    </div>
  )
}

export default EditPostSection