import { postChat } from "@/api/chat";
import InputMessage from "@/components/InputMessage";
import MessageComponent from "@/components/ShowMessage";
import { useAlertStore } from "@/store/alertStore";
import { useThemeStore } from "@/store/themeStore";
import type { ChatProps } from "@/types";
import type { InputRef } from "antd";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = import.meta.env.VITE_INTERX_STORAGE_KEY;

const Home: React.FC = () => {
  // states
  const [chat, setChat] = useState<ChatProps[]>(() => {
    try {
      const savedChat = localStorage.getItem(STORAGE_KEY);
      return savedChat ? JSON.parse(savedChat) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingMessage, setTypingMessage] = useState<string>("");
  // refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  //stores
  const { theme } = useThemeStore();
  const { setAlertMessage, setAlertError } = useAlertStore();

  // auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isLoading, typingMessage]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const showMessage = (message: string) => {
    let index = 0;
    setTypingMessage("");

    const now = new Date();
    const timestamp = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // typing efffect
    const interval = setInterval(() => {
      if (index < message.length) {
        setTypingMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
        setChat((prev) => [
          ...prev,
          {
            role: "system",
            content: message,
            timestamp,
          },
        ]);
        setTypingMessage("");
      }
    }, 15);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const now = new Date();
    const timestamp = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp,
      },
    ]);

    try {
      const response = await postChat(userMessage);
      const botMessage = response.choices[0]?.message?.content;
      showMessage(botMessage ?? "");
    } catch (error) {
      console.error("[ChatInterface/handleSubmit] ERROR: " + error);
      setAlertMessage(error instanceof Error ? error.message : String(error));
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다. 에러가 발생하여 잠시후 다시 시도해주세요.",
          timestamp,
        },
      ]);

      setAlertError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center">
      <div className="w-full flex-1 space-y-4 overflow-y-auto p-4">
        <div className="mx-auto w-[70%]">
          {chat.map((message, index) => (
            <MessageComponent
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {typingMessage.length > 0 && (
            <MessageComponent
              role="system"
              content={typingMessage}
              timestamp={new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            />
          )}
          {isLoading && typingMessage.length === 0 && (
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full ${theme === "dark" ? "bg-white/20" : "bg-black/20"}`}
              />
              <div className="flex items-center gap-2">
                <Spin size="small" />
                <span
                  className={
                    theme === "dark" ? "text-white/60" : "text-black/60"
                  }
                >
                  작성중...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <InputMessage
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        inputRef={inputRef}
      />
    </div>
  );
};

export default Home;
