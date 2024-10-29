import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";

import { Provider } from "react-redux";
import store from "./redux/stores/store.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); 

root.render(
  <Provider store={store}>
    <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Redirect from={`/`} to="/auth/signin" />
        </Switch>
      </HashRouter>
  </Provider>
  
);
