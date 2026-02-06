import React from "react";

import { Route, Switch } from "react-router-dom";

import PageNotFound from "components/commons/PageNotFound";
import { DASHBOARD_ROUTES } from "components/routeConstants";

import Sidebar from "./Sidebar";

const Dashboard = () => (
  <div className="flex h-screen w-full overflow-hidden">
    <Sidebar />
    <main className="flex-grow overflow-y-auto">
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact component={component} key={path} path={path} />
        ))}
        <Route component={PageNotFound} path="*" />
      </Switch>
    </main>
  </div>
);

export default Dashboard;
