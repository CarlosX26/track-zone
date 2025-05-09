import axios from "axios";
import AppError from "@/utils/appError";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.data.errors && error.response.data.errors instanceof Array) {
        const messages = error.response.data.errors.map((err: { message: string }) => err.message);
        return Promise.reject(new AppError(messages, error.response.status));
      }

      return Promise.reject(new AppError(error.response.data.message, error.response.status));
    } else {
      return Promise.reject(new AppError("Erro no servidor interno.", error.response.status));
    }
  },
);

export default api;
