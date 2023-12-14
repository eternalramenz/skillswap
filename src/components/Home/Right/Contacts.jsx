import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";
const Contacts = ({ props }) => {
  const { userInformation } = useSelector((state) => state.authReducer.userData);
  const { setCurrentChat } = useGlobalContext();


  const sortedContacts = props.slice().sort((a, b) => {
    const nameA = a.membersData.find((member) => member._id !== userInformation._id).firstName.toLowerCase();
    const nameB = b.membersData.find((member) => member._id !== userInformation._id).firstName.toLowerCase();
    
    if (nameA === nameB) {
      const lastNameA = a.membersData.find((member) => member._id !== userInformation._id).lastName.toLowerCase();
      const lastNameB = b.membersData.find((member) => member._id !== userInformation._id).lastName.toLowerCase();
      return lastNameA.localeCompare(lastNameB);
    }

    return nameA.localeCompare(nameB);
  });

  const handleChatClick = (contact) => {
    setCurrentChat(contact);
  };

  return (
    <>
      {sortedContacts.map((contact, index) => {
        const { profilePicture, firstName, lastName } = contact.membersData.find((member) => member._id !== userInformation._id);
        return (
          <Link to='/message' key={index}>
            <button className="flex items-center pl-2 rounded-xl hover:bg-textbox cursor-pointer dark:hover:bg-black1 w-full" onClick={() => handleChatClick(contact)}>
              <div className="w-14 h-14 flex items-center">
                <img src={profilePicture} alt="" className="w-12 h-12 object-cover rounded-xl" />
              </div>
              <div className="flex flex-grow px-4 items-center justify-between">
                <div className="flex items-start flex-col gap-1">
                  <span className="font-main font-semibold text-md text-darkBlue truncate dark:text-white2 dark:font-medium">
                    {firstName + " " + lastName}
                  </span>
                  <span className="font-main text-sm text-gray max-w-[10rem] dark:text-darkWhite dark:font-medium truncate ">
                    {contact.messageData.content}
                  </span>
                </div>
              </div>
            </button>
          </Link>
        );
      })}
    </>
  );
};

export default Contacts;
