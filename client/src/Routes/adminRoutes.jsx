
import ConfigTime from "../views/Admin/ConfigTime";
import Statictis from "../views/Admin/Statistics";
import Profile from "../components/Profile"
import UserManagement from "../views/Admin/UserManagement";
import { IoMdPerson } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";

var routes = [
  {
    path: "/dashboard",
    name: "Quản lý người dùng",
    icon: <BsPersonFillGear color="inherit" />,
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Thời gian mượn/trả sách",
    icon: <FaCogs color="inherit" />,
    component: ConfigTime,

    layout: "/admin",
  },
  {
    path: "/statistic",
    name: "Thống kê người dùng",
    icon: <MdOutlineHistory color="inherit" />,
    component: Statictis,

    layout: "/admin",
  },
  {
    name: "QUẢN LÝ TÀI KHOẢN",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Thông tin cá nhân",
        icon: <IoMdPerson color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
    ],
  },
];
export default routes;
