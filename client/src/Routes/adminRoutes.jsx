// import
import Dashboard from "../views/Admin/Dashboard";
import Tables from "../views/Admin/Tables";
import Profile from "../views/Admin/Profile";
import UserManagement from "../views/Admin/UserManagement";
import { FaCogs } from "react-icons/fa";
import { TbHome } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";

import {
  HomeIcon,
  PersonIcon,
  UserIcon,
} from "../components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Quản lý người dùng",
    icon: <UserIcon color="inherit" />,
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Thời gian mượn/trả sách",
    icon: <FaCogs color="inherit" />,
    component: Tables,
    layout: "/admin",
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
        layout: "/admin",
      },
    ],
  },
];
export default dashRoutes;
