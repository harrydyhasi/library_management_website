// import
import Dashboard from "../views/Manager/Dashboard";
import Tables from "../views/Manager/categoryManagement";
import Billing from "../views/Manager/Billing";
import History from "../views/Manager/History";
import Profile from "../views/Manager/Profile";

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
import { HamburgerIcon, EditIcon } from '@chakra-ui/icons'
var dashRoutes = [
 
//manager
  {
    path: "/history",
    name: "Trang chủ",
    icon: <HomeIcon color="inherit" />,
    component: History,
    layout: "/manager",
  },
  {
    path: "/tables",
    name: "Quản lý danh mục",
    icon: <HamburgerIcon color="inherit" />,
    component: Tables,
    layout: "/manager",
  },
  {
    path: "/billing",
    name: "Quản lý sách",
    icon: <DocumentIcon color="inherit" />,
    component: Billing,
    layout: "/manager",
  },
  {
    path: "/dashboard",
    name: "Quản lý phiếu mượn",
    icon: <EditIcon color="inherit" />,
    component: Dashboard,
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
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/manager",
      },
      
    ],
  },
];
export default dashRoutes;
