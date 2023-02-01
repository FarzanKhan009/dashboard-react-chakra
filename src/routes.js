import React from "react";
import jwt_decode from "jwt-decode";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdPrint,
  MdOutlineSettingsSuggest,
  MdOutlineShoppingCart,
  MdOutlinePayment,
  MdFileCopy
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default copy";
import Printers from "views/admin/printers";
import PrintJobs from "views/admin/printJobs";
import Payments from "views/admin/payments";
import PrinterView from "views/admin/printerView";
import Dashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
    name: "Printers",
    layout: "/admin",
    path: "/printers",
    icon: <Icon as={MdPrint} width='20px' height='20px' color='inherit' />,
    component: Printers,
    // routes: [
    //   {
    //     // Also note how we added /home before the 
    //     // actual page name just to create a complete path
    //     path: '/printers/page1',
    //     component: PrintJobs,
    //   },

    // ],
  },
  {
    name: "Print Jobs",
    layout: "/admin",
    path: "/print-jobs",
    icon: <Icon as={MdFileCopy} width='20px' height='20px' color='inherit' />,
    component: PrintJobs,
  },
  {
    name: "Payments",
    layout: "/admin",
    path: "/payments",
    icon: <Icon as={MdOutlinePayment} width='20px' height='20px' color='inherit' />,
    component: Payments,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
    name: "Printer View Page",
    layout: "/admin",
    path: "/printerView",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: PrinterView,
  },
  // {
  //   name: "MAIN Dashboard",
  //   layout: "/admin",
  //   path: "/default-copy",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  // },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
