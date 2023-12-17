import { useMutation, useQuery } from "react-query";

import authenticationApi from "apis/authentication";
import chatsApi from "apis/chats";
import { QUERY_KEYS } from "constants/query";
import { useAuthDispatch } from "contexts/auth";
import routes from "routes";

export const useLogin = () => useMutation(authenticationApi.login);

export const useShowChat = id =>
  useQuery({
    queryKey: [QUERY_KEYS.CHATS, id],
    queryFn: () => chatsApi.show(id),
  });

export const useLogout = () => {
  const authDispatch = useAuthDispatch();

  return useMutation(authenticationApi.logout, {
    onSuccess: () => {
      authDispatch({ type: "LOGOUT" });
      window.location.href = routes.login;
    },
  });
};

export const useSignup = () => useMutation(authenticationApi.signup);
