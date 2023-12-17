import React from "react";

import { Route, Switch } from "react-router-dom";

import Sidebar from "components/Dashboard/Sidebar";
import { DASHBOARD_ROUTES } from "components/routeConstants";

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="w-full">
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact component={component} key={path} path={path} />
        ))}
      </Switch>
    </div>
  </div>
);
export default Dashboard;
