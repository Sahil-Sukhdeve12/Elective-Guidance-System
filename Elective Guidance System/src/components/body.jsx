import { createBrowserRouter,RouterProvider } from "react-router-dom";

import Signup from "./signup";
import Login from "./login";
import Domain from "./domain";
import Subject from "./subject";
// import Admin from "./Admin";
// import Header from "./header";
// import Footer from "./footer";

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
        // {
        //     path:"/admin",
        //     element:<Admin/>
        // }
    ]);

    return(
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;