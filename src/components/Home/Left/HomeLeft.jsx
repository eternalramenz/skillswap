import ProfileCard from './ProfileCard.jsx'
import Followers from './Followers.jsx'
import Menu from './Menu'

const HomeLeft = ({setOpenFollowersDrawer}) => {

  return (
    <>
      <div className="h-full flex flex-col items-left ">
        <ProfileCard />
        <Menu />
        <Followers setOpenFollowersDrawer={setOpenFollowersDrawer}/>
      </div>
    </>
  )
}

export default HomeLeft