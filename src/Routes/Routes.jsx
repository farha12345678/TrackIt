
import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Root from "../Layout/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard";




import BookParcel from "../Components/Dashboard/UserDashboard/BookParcel";
import MyParcel from "../Components/Dashboard/UserDashboard/MyParcel";
import MyProfile from "../Components/Dashboard/UserDashboard/MyProfile";
import AllDeliveryMen from "../Components/Dashboard/AdminHome/AllDeliveryMen/AllDeliveryMen";
import AllParcel from "../Components/Dashboard/AdminHome/AllParcel/AllParcel";
import AllUsers from "../Components/Dashboard/AdminHome/AllUsers/AllUsers";
import Statistics from "../Components/Dashboard/AdminHome/Statistics/Statistics";
import MyDeliveryList from "../Components/Dashboard/DeliveryMen/DeliveryList/MyDeliveryList";
import CheckOut from "../Components/Dashboard/UserDashboard/CheckOut";
import PrivateRoutes from "./PrivateRoutes";


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
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
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
                element:<AllDeliveryMen></AllDeliveryMen>
            },
            {
                path:'allParcel',
                element:<AllParcel></AllParcel>
            },
            {
                path:'allUser',
                element:<AllUsers></AllUsers>
            },
            {
                path:'stat',
                element:<Statistics></Statistics>
            },
            {
                path:'list',
                element:<MyDeliveryList></MyDeliveryList>
            },
            {
                path:'myParcel/checkout',
                element:<CheckOut></CheckOut>
            }
        ]
    }
])
export default router;