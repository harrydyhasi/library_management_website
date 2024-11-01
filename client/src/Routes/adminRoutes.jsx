// import
import Dashboard from "../views/Dashboard/Dashboard";
import Tables from "../views/Dashboard/Tables";
import Billing from "../views/Dashboard/Billing";
import History from "../views/Dashboard/History";
import Profile from "../views/Dashboard/Profile";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  ClockIcon,
  SettingsIcon
  // SupportIcon,
} from "../components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Quản lý người dùng",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Thời gian mượn/trả sách",
    icon: <SettingsIcon color="inherit" />,
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
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
    ],
  },
];
export default dashRoutes;
