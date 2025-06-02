import { useThemeStore } from "../store/themeStore";

interface MessageProps {
  role: "user" | "system";
  content: string;
}

const Message = ({ role, content }: MessageProps) => {
  const { theme } = useThemeStore();
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 ${
        !isUser ? (theme === "dark" ? "bg-black/50" : "bg-white/50") : ""
      } p-4 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div
          className={`h-8 w-8 flex-shrink-0 rounded-full ${
            theme === "dark" ? "bg-white/20" : "bg-black/20"
          }`}
        >
          <div
            className={`flex h-full w-full items-center justify-center ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            AI
          </div>
        </div>
      )}
      <div
        className={`flex flex-col ${isUser ? "max-w-[80%]" : "max-w-[80%]"}`}
      >
        <div
          className={`mb-1 font-medium ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {isUser ? "You" : "system"}
        </div>
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
          {content}
        </div>
      </div>
      {isUser && (
        <div
          className={`h-8 w-8 flex-shrink-0 rounded-full ${
            theme === "dark" ? "bg-white/20" : "bg-black/20"
          }`}
        >
          <div
            className={`flex h-full w-full items-center justify-center ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            U
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
