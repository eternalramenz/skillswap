import { Link } from 'react-router-dom'
const FollowerCard = ({props}) => {

  return (
    <div 
      className="flex flex-col gap-4 p-6 w-full bg-white rounded-2xl ring-1 ring-lightGray dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"

    >
      <div className="flex items-left gap-4">
        <div className="w-12 h-12 rounded-xl flex-shrink-0">
          <img src={props.userData.profilePicture} alt="" className="w-12 h-12 flex-shrink-0 object-cover rounded-xl " />
        </div>
        <div className="flex flex-col">
          <Link to={`/profile/${props._id}`} className="flex">
            <div className="flex flex-col">
              <span className="font-main font-normal text-md text-darkBlue dark:text-white2">
                {props.userData.firstName + ' ' + props.userData.lastName}
              </span>
              <span className="font-main font-medium text-lg text-darkBlue dark:text-white2">
                {props.userData.expertise}
              </span>
              <span className="font-main font-medium text-lg text-darkBlue dark:text-white2">
                {props.userData.location}
              </span>
            </div>
          </Link>
        </div>
      </div>     
      <div className="flex flex-row justify-end gap-4 items-center">

        <button 
          className="shadow-2xl w-1/4 shadow-rose-500/50 rounded-xl bg-rose-500 p-3 h-10 mr-4 text-white pl-6 pr-6 text-sm cursor-pointer flex items-center justify-center hover:bg-rose-400 transition-all duration-300"
          // onClick={handleAccept}
        >
          {/* <img src={follow} alt="" className="w-4 h-4 mr-1"/> */}
          <span className="font-main">Unfollow</span>
        </button>

      </div>
    </div>
  )
}

export default FollowerCard