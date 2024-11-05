
import Dashboard from "../views/Admin/Dashboard";
import ConfigTime from "../views/Admin/ConfigTime";
import Tables from "../views/Admin/Tables";
import Profile from "../views/Admin/Profile";
import UserManagement from "../views/Admin/UserManagement";
import { LuSettings2 } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";


var routes = [
  {
    path: "/dashboard",
    name: "Quản lý người dùng",
    icon: <BsPersonFillGear color="inherit" />,
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Thời gian mượn/trả sách",
    icon: <FaCogs color="inherit" />,
    component: ConfigTime,

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
        icon: <IoMdPerson color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
    ],
  },
];
export default routes;
