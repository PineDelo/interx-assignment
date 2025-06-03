import type { ChatProps } from "@/types";
import { axiosInstance } from "./axiosInstance";

const API_MODEL = import.meta.env.VITE_INTERX_MODEL;

export const postChat = async (
  message: string,
): Promise<{ choices: { message: ChatProps }[] }> => {
  const response = await axiosInstance.post("", {
    model: API_MODEL,
    messages: [{ role: "user", content: message }],
  });

  return response.data;
};
