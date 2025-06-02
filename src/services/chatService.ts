import axios from "axios";

const API_URL = import.meta.env.VITE_INTERX_API_URL;
const API_TOKEN = import.meta.env.VITE_INTERX_TOKEN;

export interface Message {
  role: "user" | "system";
  content: string;
}

export const sendMessage = async (
  message: string,
): Promise<{ choices: { message: Message }[] }> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
