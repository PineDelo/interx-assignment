import logo from "@/assets/logo.png";
import type { ChatProps } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useThemeStore } from "../store/themeStore";

const ShowMessage: React.FC<ChatProps> = ({ role, content, timestamp }) => {
  const { theme } = useThemeStore();
  const isUser = role === "user";

  return (
    <div className={`flex w-full gap-4 p-4 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="h-8 w-8 flex-shrink-0 rounded-full">
          <img src={logo} alt="log" className="h-full w-full" />
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={`rounded-lg p-3 whitespace-pre-wrap ${
            isUser
              ? theme === "dark"
                ? "bg-white/20 text-white"
                : "bg-black/20 text-black"
              : theme === "dark"
                ? "text-white/80"
                : "text-black/80"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ children, ...props }) {
                return (
                  <code
                    className={`${
                      theme === "dark" ? "bg-black/50" : "bg-white/50"
                    } rounded p-4`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre({ children, ...props }) {
                return (
                  <pre
                    className={`${
                      theme === "dark" ? "bg-black/50" : "bg-white/50"
                    } overflow-x-auto rounded-lg p-4`}
                    {...props}
                  >
                    {children}
                  </pre>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        <div
          className={`text-xs opacity-60 ${isUser ? "mt-1 text-right" : "-mt-1"}`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ShowMessage;
