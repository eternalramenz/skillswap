const HeartIcon = ({color}) => {
  return (
    <div className="cursor-pointer">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 24 24"
        style={{ enableBackground: 'new 0 0 24 24' }}
        xmlSpace="preserve"
        className={`${color}w-full h-full`} 
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.1,3C19.6,3,22,6.4,22,9.5C22,15.8,12.2,21,12,21S2,15.8,2,9.5C2,6.4,4.4,3,7.9,3c2,0,3.3,1,4.1,1.9 C12.8,4,14.1,3,16.1,3z"
        />
      </svg>
    </div>
  )
}

export default HeartIcon