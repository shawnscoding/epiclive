import React from "react";
import HomePage from "./layout/homepage/HomePage";
import Dashboard from "./layout/dashboard/Dashboard";
import { Route } from "react-router-dom";
import HelpModal from "./component/Modals/help/HelpModal";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import TestComponent from "./component/test/TestComponent";

function App({ alert }) {
  const { enqueueSnackbar } = useSnackbar();


  const handleClickVariant = (variant) => (message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  React.useEffect(() => {
    if (alert !== null) {
      if (alert.length > 0) {
        alert.map((a) => handleClickVariant(a.alerttype)(a.message));
      }
    }
  }, [alert]);

  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/test" component={TestComponent} />
      <Route
        path="/dashboard/mbc/:category"
        render={() => (
          <React.Fragment>
            <Dashboard />
          </React.Fragment>
        )}
      />

      <HelpModal />
    </div>
  );
}

const mapStateToProps = (state) => ({
  alert: state.modal.alert,
});

export default connect(mapStateToProps)(App);
