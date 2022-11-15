import { createTheme, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/utils/Router/ScrollToTop";
import ComponentWithTitle from "./components/utils/WebTitle/ComponentWithTitle";
import AuthContextProvider from "./contexts/AuthContext";
import { HomePage, HouseDetail, LandingPage, Registration } from "./pages";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import RulesAndRegulations from "./pages/RulesAndRegulations";
import UniversityPage from "./pages/UniversityPage";

const theme = createTheme({
  typography: {
    fontFamily: "Be Vietnam Pro, sans-serif",
  },
});

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Router>
            <ScrollToTop>
              <Switch>
                <Route path="/login">
                  <LoginPage />
                </Route>

                <Route path="/register">
                  <ComponentWithTitle title="Register | Unihome">
                    <Registration />
                  </ComponentWithTitle>
                </Route>

                <Route path="/profile">
                  <ComponentWithTitle title="Profile | Unihome">
                    <Profile />
                  </ComponentWithTitle>
                </Route>

                {/* <Route path="/detail/:id">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <RentDetail />
                  </ComponentWithTitle>
                </Route> */}

                <Route path="/house-detail/:id">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <HouseDetail />
                  </ComponentWithTitle>
                </Route>

                <Route path="/home">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <HomePage isSharingPage={false} />
                  </ComponentWithTitle>
                </Route>

                {/* <Route path="/sharing/:type">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <HomePage isSharingPage={true} />
                  </ComponentWithTitle>
                </Route> */}

                {/* <Route path="/sharing">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <HomePage isSharingPage={true} />
                  </ComponentWithTitle>
                </Route> */}

                <Route path="/type/:type">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <HomePage isSharingPage={false} />
                  </ComponentWithTitle>
                </Route>

                <Route path="/university/:uniName">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <UniversityPage />
                  </ComponentWithTitle>
                </Route>

                <Route path="/university">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <UniversityPage />
                  </ComponentWithTitle>
                </Route>

                {/* <Route path="/paymentsuccess">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <PaymentSuccess />
                  </ComponentWithTitle>
                </Route> */}

                <Route path="/rules-and-regulations">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <RulesAndRegulations />
                  </ComponentWithTitle>
                </Route>

                <Route exact path="/">
                  <ComponentWithTitle title="Unihome - Let's us be your new home">
                    <LandingPage />
                  </ComponentWithTitle>
                </Route>
                <Route render={() => <Redirect to={{ pathname: "/" }} />} />
              </Switch>
            </ScrollToTop>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
