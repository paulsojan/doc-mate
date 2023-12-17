import React from "react";

import { QueryClientProvider } from "react-query";

import { AuthProvider } from "contexts/auth";
import { UserProvider } from "contexts/user";
import queryClient from "utils/queryClient";

import Main from "./components/Main";
// eslint-disable-next-line import/order
import "./common/i18n";

const App = props => (
  <AuthProvider>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Main {...props} />
      </QueryClientProvider>
    </UserProvider>
  </AuthProvider>
);

export default App;
