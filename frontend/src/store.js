import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { listProject ,addProject ,filterList } from "./redux/project/projectReducer";
import { userSignInReducer,userListReducer,userSignUpReducer, userSignOutReducer} from "./redux/user/userReducer"
const reducer = combineReducers({
  listProject: listProject,
  addProject : addProject,
  filterList : filterList,
  userSignUp: userSignUpReducer,
  userSignIn : userSignInReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userSignIn: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
