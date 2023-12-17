import { useMutation, useQuery } from "react-query";

import chatsApi from "apis/chats";
import { QUERY_KEYS } from "constants/query";

export const useFetchChats = () =>
  useQuery({
    queryKey: QUERY_KEYS.CHATS,
    queryFn: () => chatsApi.fetch(),
  });

export const useCreateChat = () => useMutation(chatsApi.create);

export const useShowChat = id =>
  useQuery({
    queryKey: [QUERY_KEYS.CHATS, id],
    queryFn: () => chatsApi.show(id),
  });
