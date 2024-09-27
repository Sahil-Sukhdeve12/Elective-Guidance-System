import { createBrowserRouter,RouterProvider } from "react-router-dom";

import Signup from "./signup";
import Login from "./login";
import Domain from "./domain";
import Subject from "./subject";
import Admin from "./Admin";
import ForgotPassword from "./forgotPassword";
import Error from "./Error";

const Body=()=>{
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/domain",
            element:<Domain/>
        },
        {
            path:"/subject",
            element:<Subject/>
        },
        {
            path:"/admin",
            element:<Admin/>
        },
        {
            path:"/forgotPassword",
            element:<ForgotPassword/>
        },{
            path:"*",
            element:<Error/>
        }
    ]);

    return(
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;