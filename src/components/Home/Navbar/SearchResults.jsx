import { Link } from "react-router-dom"
import { useGlobalContext } from '../../../contexts/GlobalContext.jsx';

const SearchResults = ({props}) => {

  const { setSearchQuery } = useGlobalContext()

  const handleClick = (event) => {
    event.preventDefault();
    setSearchQuery('');
  }

  return (
    <button className="w-full items-center justify-between" onClick={handleClick}>
      <Link to={`/profile/${props._id}`}>
        <div className="flex gap-4">
          <div className="rounded-3xl flex-shrink-0 w-12 h-12 relative">
            <img src={props.profilePicture} className="rounded-2xl w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col items-center justify-start">
            <span className="w-full text-left dark:text-white2 font-main text-md">{props.firstName + " " + props.lastName}</span>
            <span className="w-full text-left dark:text-darkWhite font-main text-sm">{props.expertise}</span>
          </div>
        </div>
      </Link>
      <div>

      </div>

    </button>
  )
}

export default SearchResults