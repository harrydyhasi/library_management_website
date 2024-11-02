import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";
import ManagerLayout from "./layouts/Manager";
import StudentLayout from "./layouts/Student";
import { store, persistor } from "./redux/stores/store"; 

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); 

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router> {/* Changed HashRouter to BrowserRouter */}
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/manager`} component={ManagerLayout} />
            <Route path={`/student`} component={StudentLayout} />
            <Redirect from={`/`} to="/auth/signin" />
          </Switch>
      </Router>
    </PersistGate>
  </Provider>
);
