import { useMutation, useQueryClient } from "react-query";

import uploadsApi from "apis/uploads";
import { QUERY_KEYS } from "constants/query";

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation(uploadsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CHATS);
    },
  });
};
