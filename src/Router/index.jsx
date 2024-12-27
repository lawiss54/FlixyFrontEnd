import {createBrowserRouter} from "react-router-dom";


import {About} from "../Pages/About.jsx";

// GuestPages
import {Login} from "../Pages/GuestPages/Login.jsx";
import {Register} from "../Pages/GuestPages/Register.jsx";

// ClientPages
import {Flixy} from "../Pages/ClientPages/Flixy.jsx";
import {Profile} from "../Pages/ClientPages/Profile.jsx";
import {Wallet} from "../Pages/ClientPages/Wallet.jsx";
import {Table} from "../Pages/ClientPages/Table.jsx";
import {NotFound} from "../Pages/NotFound.jsx";
import {Subscription} from "../Pages/ClientPages/subscription.jsx";


//Layouts
import {ClientLayouts} from "../Pages/Layout/ClientLayout/Layouts.jsx";
import {Layouts} from "../Pages/Layout/Layouts.jsx";


// const of path link 
export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/";
// Guest path

export const ABOUT_ROUTE = "/about";
// Client path
export const TABLE_ROUTE = "/table";
export const FLIXY_ROUTE = "/flixy";
export const PROFILE_ROUTE = "/profile";
export const WALLET_ROUTE = "/wallet";
export const SUBSCRIPTION_ROUTE = "/subscription";


export const route = createBrowserRouter([
    {
      element: <Layouts /> ,
      children: [
        {
          path: "*",
          element: <NotFound /> ,
        },
        {
          path: LOGIN_ROUTE,
          element: <Login /> ,
        },
        {
          path: REGISTER_ROUTE,
          element: <Register /> ,
        },
      ]
    },
    {
      element: <ClientLayouts /> ,
      children: [
        {
          path: FLIXY_ROUTE,
          element: <Flixy /> ,
        },
        {
          path: PROFILE_ROUTE,
          element: <Profile /> ,
        },
        {
          path: WALLET_ROUTE,
          element: <Wallet /> ,
        },
        {
          path: SUBSCRIPTION_ROUTE,
          element: <Subscription /> ,
        },
        {
          path: ABOUT_ROUTE,
          element: <About /> ,
        },
        {
          path: TABLE_ROUTE,
          element: <Table /> ,
        },
        {
          path: "*",
          element: <NotFound /> ,
        }
      ]
    }
])