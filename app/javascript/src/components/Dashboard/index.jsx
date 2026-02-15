import React from "react";
import { Route, Switch } from "react-router-dom";

import PageNotFound from "components/commons/PageNotFound";
import Sidebar from "components/Dashboard/Sidebar";
import { DASHBOARD_ROUTES } from "components/routeConstants";

const Dashboard = () => {
  // Render the routes defined in DASHBOARD_ROUTES
  const renderRoutes = () => (
    DASHBOARD_ROUTES.map(({ path, component }) => (
      <Route exact key={path} path={path} component={component} />
    ))
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Switch>
          {renderRoutes()}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
