// import
import Dashboard from "../views/Manager/Dashboard";

import category_management from "../views/Manager/category_management";
import Billing from "../views/Manager/Billing";
import History from "../views/Manager/History";
import Profile from "../views/Manager/Profile";
import BorrowSlipManagement from "../views/Manager/BorrowSlipManagement";
import { LuBookCopy } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";
import { TbHome } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";

var dashRoutes = [
 
//manager
  {
    path: "/history",
    name: "Trang chủ",
    icon: <TbHome color="inherit" />,
    component: History,
    layout: "/manager",
  },
  {
    path: "/category_management",
    name: "Quản lý danh mục",
    icon: <TbCategory color="inherit" />,
    component: category_management,
    layout: "/manager",
  },
  {
    path: "/billing",
    name: "Quản lý sách",
    icon: <LuBookCopy color="inherit" />,
    component: Billing,
    layout: "/manager",
  },
  {
    path: "/dashboard",
    name: "Quản lý phiếu mượn",
    icon: <AiOutlineReconciliation color="inherit" />,
    component: BorrowSlipManagement,
    layout: "/manager",
  },

  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <FaRegUser color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/manager",
      },
      
    ],
  },
];
export default dashRoutes;
