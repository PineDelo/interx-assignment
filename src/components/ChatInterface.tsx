import type { InputRef } from "antd";
import { Button, Input, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import type { Message } from "../services/chatService";
import { sendMessage } from "../services/chatService";
import { useThemeStore } from "../store/themeStore";
import MessageComponent from "./Message";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const { theme } = useThemeStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, typingMessage]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const typeMessage = (message: string) => {
    let index = 0;
    setTypingMessage("");

    const interval = setInterval(() => {
      if (index < message.length) {
        setTypingMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { role: "system", content: message }]);
        setTypingMessage("");
      }
    }, 15); // 타이핑 속도 조절 (ms)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Send message to API
      const response = await sendMessage(userMessage);
      const aiMessage = response.choices[0].message.content;

      // Start typing effect
      typeMessage(aiMessage);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <MessageComponent
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        {typingMessage && (
          <MessageComponent role="system" content={typingMessage} />
        )}
        {isLoading && !typingMessage && (
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full ${theme === "dark" ? "bg-white/20" : "bg-black/20"}`}
            />
            <div className="flex items-center gap-2">
              <Spin size="small" />
              <span
                className={theme === "dark" ? "text-white/60" : "text-black/60"}
              >
                AI is thinking...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div
        className={`border-t ${
          theme === "dark" ? "border-white/20" : "border-black/20"
        } p-4`}
      >
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            ref={inputRef}
            size="large"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className={`${
              theme === "dark"
                ? "border-white/20 bg-black text-white"
                : "border-black/20 bg-white text-black"
            }`}
          />
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={`${
              theme === "dark"
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
