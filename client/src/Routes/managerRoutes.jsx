// import
import category_management from "../views/Manager/CategoryManagement";
import BookManagement from "../views/Manager/BookManagement"
import Dashboard from "../views/Manager/Dashboard";
import Profile from "../components/Profile";
import BorrowSlipManagement from "../views/Manager/BorrowSlipManagement";
import { LuBookCopy } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";
import { TbHome } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
var dashRoutes = [
 
//manager
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: <TbHome color="inherit" />,
    component: Dashboard,
    layout: "/manager",
  },
  {
    path: "/category_management",
    name: "Quản lý danh mục",
    icon: <TbCategory color="inherit" />,
    component: category_management,
    layout: "/manager",
  },
  {
    path: "/book_management",
    name: "Quản lý sách",
    icon: <LuBookCopy color="inherit" />,
    component: BookManagement,
    layout: "/manager",
  },
  {
    path: "/borrow_slip_management",
    name: "Quản lý phiếu mượn",
    icon: <AiOutlineReconciliation color="inherit" />,
    component: BorrowSlipManagement,
    layout: "/manager",
  },

  {
    name: "QUẢN LÝ TÀI KHOẢN",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Thông tin cá nhân",
        rtlName: "لوحة القيادة",
        icon: <IoMdPerson color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/manager",
      },
      
    ],
  },
];
export default dashRoutes;
