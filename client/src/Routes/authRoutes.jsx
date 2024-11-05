import SignIn from "../views/Auth/SignIn";
import SignUp from "../views/Auth/SignUp";

import {
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";


var routes = [
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default routes;
