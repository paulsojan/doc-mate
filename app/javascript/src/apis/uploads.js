import axios from "axios";

import { BASE_URL } from "constants/index";

const create = payload =>
  axios.post(`${BASE_URL}/uploads`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const uploadsApi = { create };

export default uploadsApi;
