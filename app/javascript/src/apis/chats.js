import axios from "axios";

import { BASE_URL } from "constants/index";

const fetch = () => axios.get(`${BASE_URL}/chats`);

const create = payload => axios.post(`${BASE_URL}/chats`, payload);

const show = id => axios.get(`${BASE_URL}/chats/${id}`);

const chatsApi = { fetch, create, show };

export default chatsApi;
