import { QueryClient } from "react-query";

import { DEFAULT_STALE_TIME } from "constants/query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});

export default queryClient;
