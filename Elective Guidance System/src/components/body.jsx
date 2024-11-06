import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Signup from "./signup";
import Login from "./login";
import Domain from "./domain";
import Subject from "./subject";
import Admin from "./Admin";
import ForgotPassword from "./forgotPassword";
import Error from "./Error";
// import Header from "./header";
import Profile from "./profile";
import Category from "./category";

const Body = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login setIsAdmin={setIsAdmin} />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/domain/:categoryId", // Use categoryId as a parameter
            element: <Domain />,
        },
        {
            path: "/electives/:trackId", // Correct path for electives
            element: <Subject />, // Component that will be rendered when this route is hit
        },        
        {
            path: "/forgotPassword",
            element: <ForgotPassword />,
        },
        {
            path: "*", // Catch-all route for error handling
            element: <Error />,
        },
        {
            path: "/category",
            element: <Category />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },]);
    // Conditionally add the admin route if the user is an admin
    if (isAdmin) {
        appRouter.routes.push({
            path: '/admin',
            element: <Admin />,
        });
    }

    return (
        <div>
            {/* <Header isAdmin={isAdmin} /> */}
            <RouterProvider router={appRouter} />
        </div>
    )

    return (
        <Router>
            <Header isAdmin={isAdmin} />
            <Routes>
                <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
                <Route path="/domain" element={<Domain />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {isAdmin && <Route path="/admin" element={<Admin />} />}
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Error />} />
                <Route path="/subject" element={<Subject />} />
            </Routes>
        </Router>
    );
}

export default Body;