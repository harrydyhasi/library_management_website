// import
import Dashboard from "../views/Student/Dashboard";
import Tables from "../views/Dashboard/Tables";
import Profile from "../components/Profile";
import { TbHome } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineHistory } from "react-icons/md";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: <TbHome color="inherit" />,
    component: Dashboard,
    layout: "/student",
  },
  {
    path: "/tables",
    name: "Lịch sử mượn/ trả sách",
    icon: <MdOutlineHistory color="inherit" />,
    component: Tables,
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
        rtlName: "لوحة القيادة",
        icon: <IoMdPerson color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/student",
      },
     
    ],
  },
];
export default dashRoutes;