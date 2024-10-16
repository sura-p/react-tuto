import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./Routes/routes";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={route} />
        <ToastContainer
        className="toster"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          // closeOnClick
          rtl={false}
          pauseOnFocusLoss
          // draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
