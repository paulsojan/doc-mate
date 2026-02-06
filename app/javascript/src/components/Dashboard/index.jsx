import React from "react";

import { Route, Switch } from "react-router-dom";

import PageNotFound from "components/commons/PageNotFound";
import Sidebar from "components/Dashboard/Sidebar";
import { DASHBOARD_ROUTES } from "components/routeConstants";

const Dashboard = () => (
  <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-y-auto">
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component: Component }) => (
          <Route exact component={Component} key={path} path={path} />
        ))}
        <Route component={PageNotFound} path="*" />
      </Switch>
    </main>
  </div>
);

export default Dashboard;
