import Profile from "../views/Studennt/Profile";
import Dashboard from "../views/Student/Dashboard";
import { IoMdPerson } from "react-icons/io";
import {
  HomeIcon,
} from "../components/Icons/Icons";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/student",
  },
  // {
  //   path: "/tables",
  //   name: "Lịch sử mượn/ trả sách",
  //   icon: <MdOutlineHistory color="inherit" />,
  //   component: Tables,
  //   layout: "/student",
  // },

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
        layout: "/student",
      },
     
    ],
  },
];
export default dashRoutes;
