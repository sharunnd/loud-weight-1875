import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducer as shelterReducer } from "./hireReducer/reducer";
// import AdminReducer from "./admin/admin.reducer"

const rootReducer = combineReducers({
  shelterReducer
});

export const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);