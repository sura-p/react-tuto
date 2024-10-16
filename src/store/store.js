// // src/store.js

 import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../features/auth/authReducer";
 import { composeWithDevTools } from "redux-devtools-extension";
// const rootReducer = combineReducers({
//   auth: authReducer
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
// store.js
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import cUReducer from "../features/connectedUser/cUReducer";
import socketService from "../services/socketService";
import { messageReducer } from "../features/messageFeature/messageReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    cUList:cUReducer,
    messages:messageReducer
  });
const persistConfig = {
  key: 'root',
  storage,
 whitelist: ['auth'],
};
const listenToSocketEvents = () => {
  socketService.on("receiveMessage", (message) => {
    // store.dispatch(setMessage(message));
  });
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

const persistor = persistStore(store);

export { store ,persistor ,listenToSocketEvents};
