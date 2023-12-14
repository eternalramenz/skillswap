interface UserInformation {
  address: string
  bio: string
  coverPicture: string
  dateOfBirth: string
  didSetupProfile: string
  expertise: string
  firstName: string
  followers: [_id: string, status: string]
  followings: [_id: string, status: string]
  lastName: string
  profilePicture: string
  skills: [string]
  _id: string
}

interface AuthState {
  userData: {
    userInformation: UserInformation;
  } | null;
  loading: boolean;
  error?: string | null;
}

interface AuthAction {
  type: string;
  data?: any; 
  error?: string;
}

const authReducer = (
  state: AuthState = { userData: null, loading: false, error: null },
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, userData: action.data, loading: false, error: null };
    case "AUTH_FAILED":
      return { ...state, loading: false, error: action.error };
    case "AUTH_CLEAR_ERROR":
      return { ...state, error: "" };
    case "AUTH_SIGN_OUT":
      localStorage.clear();
      return { userData: null, loading: false, error: action.error };

    case "UPDATE_PICTURE":
      return {
        ...state,
        userData: {
          ...state.userData!,
          userInformation: {
            ...state.userData?.userInformation!,
            profilePicture: action.data.profilePicture,
          },
        },
      };

    case "UPDATE_ACCOUNT":
      return {
        ...state,
        userData: {
          ...state.userData!,
          userInformation: {
            ...state.userData?.userInformation!,
            firstName: action.data.firstName,
            lastName: action.data.lastName,
            address: action.data.address,
            dateOfBirth: action.data.dateOfBirth,
            expertise: action.data.expertise,
            skills: action.data.skills,
            bio: action.data.bio,
          },
        },
      };
  
    case "SETUP_SUCCESS":
      return {
        ...state,
        userData: {
          ...state.userData!,
          userInformation: {
            ...(state.userData?.userInformation || {}),
            ...action.data,
          },
        },
      };

    default:
      return state;
  }
};

export default authReducer;
