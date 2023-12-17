import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import FileUpload from "components/Dashboard/FileUpload";
import QuestionAnswer from "components/Dashboard/QuestionAnswer";
import routes from "routes";

export const AUTH_ROUTES = [
  {
    path: routes.signup,
    component: Signup,
  },
  {
    path: routes.login,
    component: Login,
  },
];

export const PRIVATE_ROUTES = [{ path: routes.root, component: Dashboard }];

export const DASHBOARD_ROUTES = [
  { path: routes.root, component: FileUpload },
  { path: routes.chat.show, component: QuestionAnswer },
];
