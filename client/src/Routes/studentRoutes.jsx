// import
import Profile from "../views/Studennt/Profile";
import UserManagement from "../views/Studennt/UserManagement";
import { LuSettings2 } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { BsPersonFillGear } from "react-icons/bs";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  ClockIcon,
  // SupportIcon,
} from "../components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: <HomeIcon color="inherit" />,
    component: UserManagement,
    layout: "/student",
  },
  {
    path: "/tables",
    name: "Lịch sử mượn/ trả sách",
    icon: <StatsIcon color="inherit" />,
    component: UserManagement,
    layout: "/student",
  },

  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/student",
      },
     
    ],
  },
];
export default dashRoutes;
