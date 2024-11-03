// import
import Tables from "../views/Admin/Tables";
import Profile from "../views/Admin/Profile";
import UserManagement from "../views/Admin/UserManagement";
import { LuSettings2 } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";

var dashRoutes = [
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
    icon: <LuSettings2 color="inherit" />,
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
        icon: <IoMdPerson color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
    ],
  },
];
export default dashRoutes;
