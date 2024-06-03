
import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Root from "../Layout/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard";
import MyParcel from "../Components/Dashboard/Parcel/MyParcel";
import BookParcel from "../Components/Dashboard/BookParcel/BookParcel";
import MyProfile from "../Components/Dashboard/UserProfile/MyProfile";
import AllMen from "../Components/DeliveryMen/AllMen";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'myParcel',
                element:<MyParcel></MyParcel>
            },
            {
                path:'book',
                element:<BookParcel></BookParcel>
            },
            {
                path:'userProfile',
                element:<MyProfile></MyProfile>
            },
            {
                path:'allMen',
                element:<AllMen></AllMen>
            }
        ]
    }
])
export default router;