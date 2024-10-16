import { createBrowserRouter } from "react-router-dom"; 
import Login from "../components/Login"; 
import SignUp from "../components/SignUp";
import Chat from "../page/Chat";
import VideoCall from "../components/VideoCall";

const route = createBrowserRouter([ 
    { 
        path: '/login', 
        element: <Login/>,  // Use JSX syntax here
    }, 
    { 
        path: '/sign-up', 
        element: <SignUp/> 
    },  
    { 
        path: '/chat', 
        element: <Chat/> 
    },
    { 
        path: '/emoji', 
        element: <VideoCall/> 
    }, 
   
]); 

export default route;
