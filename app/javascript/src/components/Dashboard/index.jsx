import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import PageNotFound from "components/commons/PageNotFound";
import Sidebar from "components/Dashboard/Sidebar";
import { DASHBOARD_ROUTES } from "components/routeConstants";

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="w-full">
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact key={path} path={path} component={component} />
        ))}
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  </div>
);

Dashboard.propTypes = {
  // No props currently, but added for future-proofing
};

export default Dashboard;
