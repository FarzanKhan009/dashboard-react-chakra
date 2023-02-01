import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect, NavLink, useHistory } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";


const RequireAuth = ({ children, redirectTo }) => {
  // const navigate = useNavigate();
  const history = useHistory()
  console.log('being run', redirectTo);
  let isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? children : <Redirect to={redirectTo} />;
}


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <RequireAuth redirectTo={"/auth"}>
              <Route path={`/`} component={AdminLayout} />
            </RequireAuth>
            <RequireAuth redirectTo={"/auth"}>
              <Route path={`/admin`} component={AdminLayout} />
            </RequireAuth>
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
