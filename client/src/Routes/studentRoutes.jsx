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
  // SupportIcon,
} from "../components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/student",
  },
  {
    path: "/tables",
    name: "Lịch sử mượn/ trả sách",
    icon: <StatsIcon color="inherit" />,
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
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/student",
      },
     
    ],
  },
];
export default dashRoutes;
