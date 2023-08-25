import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_END_POINT;

const getBardApi = (userMessage) =>
  axios.get(BASE_URL + "?ques=" + userMessage);

export default {
  getBardApi,
};
