import Location from '../../../../icons/LocationIcon.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StarIcon from '../../../../icons/StarIcon.jsx';
const Trader = ({ props }) => {
  const [bookMarked, setBookMarked ] = useState(false)

  return (
    <Link to={`/profile/${props._id}`}>
      <div className="dark:bg-lightBlack/70 dark:backdrop-blur-3xl ring-1  ring-lightGray relative flex flex-col p-4 bg-card shadow-xl shadow-zinc-200 rounded-2xl gap-2 mb-1 dark:shadow-black/20 dark:ring-darkGray">{/* Post */}
        <div className="flex items-center mt-2">
          <div className="flex pl-2 ">
            <div className="rounded-3xl min-w-[3rem] min-h-[3rem] w-16 h-16 flex-shrink">
              <img src={props.profilePicture} alt="" className="rounded-2xl object-cover" />
            </div>
            <div className="flex flex-col pl-4">
              <div className="flex items-center">
                <span className="font-main font-medium text-gray mr-1 text-sm dark:text-darkWhite">
                  {props.firstName + " " + props.lastName}
                </span>
                <div className="w-8 h-8">
                  <StarIcon color="fill-yellow-500"/>
                </div>
                <span className="font-main font-semibold text-darkBlue ml-1 text-sm">
                  SSSSSSS
                </span>
                <span className="font-main text-gray text-sm">
                  SSSS
                </span>
              </div>
              <span className="font-main font-semibold text-darkBlue text-lg dark:text-white2 ">{props.expertise}</span>
              <div className="flex flex-wrap mt-1 ">
                {props.skills.map((skill, index) => (
                  <div
                    className={`mr-2 mb-2 rounded-lg px-2 py-1 flex items-center justify-center text-xs font-medium font-main ${badgeColors[index].background} ${badgeColors[index].text} rounded-md`}
                    key={index}
                  >
                    <span className="">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-main text-gray text-sm mt-2 mx-2 line-clamp-2 dark:text-darkWhite">
            {props.bio}
          </span>
        </div>
        {/* <div className="absolute right-6 mt-2 w-8 h-8 flex items-center justify-center" onClick={(e)=>{e.preventDefault()}}>
          <BookMark bookMarked={bookMarked} />
        </div> */}
        <hr className="text-lightGray mt-2 dark:text-darkGray"/>
        <div className="flex justify-between items-center">
          <div className="">
            <div className="flex mt-2 ">
              <Location />
              <span className="font-main font-medium text-gray text-sm ml-1 dark:text-darkWhite dark:font-normal">{props.address}</span>
            </div>
          </div>
          <div>
            <span className="font-main font-medium mr-2">{props.createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Trader;
