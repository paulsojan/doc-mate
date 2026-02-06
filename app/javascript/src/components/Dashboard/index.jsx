import React from "react";

import { Route, Switch } from "react-router-dom";

import Sidebar from "components/Dashboard/Sidebar";
import { DASHBOARD_ROUTES } from "components/routeConstants";
import PageNotFound from "components/commons/PageNotFound";

const Dashboard = () => (
  <div className="flex h-screen w-full overflow-hidden">
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
