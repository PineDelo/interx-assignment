import type { ChatProps, SidebarProps } from "@/types";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import logoHd from "../assets/logo-hd.png";
import logoWhite from "../assets/logo-white.png";
import { useThemeStore } from "../store/themeStore";

const { Sider } = Layout;
const STORAGE_KEY = import.meta.env.VITE_INTERX_STORAGE_KEY;

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { theme, sidebarTheme } = useThemeStore();
  const [savedChat, setSavedChat] = useState<ChatProps[]>([]);

  useEffect(() => {
    const savedChat = localStorage.getItem(STORAGE_KEY);
    if (savedChat) {
      setSavedChat(JSON.parse(savedChat));
      console.log("저장된 채팅 내용:", JSON.parse(savedChat));
    }
  }, []);

  return (
    <Sider
      collapsible={false}
      width={260}
      style={{
        backgroundColor: theme === "dark" ? "#181818" : sidebarTheme,
        transition: "all 0.3s ease-in-out",
        position: "relative",
        height: "100%",
      }}
    >
      <div className="flex h-full flex-col">
        <div
          className={`content-box flex h-14 items-center justify-between border-b border-[#e0e0e0] p-4 align-middle ${theme === "dark" ? "bg-[181818] text-white" : "bg-white text-black"}`}
        >
          <img
            className="h-6 w-32"
            src={theme === "dark" ? logoWhite : logoHd}
            alt="logo"
          />
          <MenuFoldOutlined
            className={`text-2xl hover:opacity-50`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p>최근 대화</p>
          {savedChat.map((message, idx) =>
            message.role === "user" ? (
              <div
                key={idx}
                className={`mb-2 rounded-lg p-2 ${
                  theme === "dark" ? "bg-white/10" : "bg-black/10"
                }`}
              >
                <div className="text-xs font-medium">
                  {message.role === "user" ? "사용자" : "시스템"}
                </div>
                <div
                  className={`text-sm ${
                    theme === "dark" ? "text-white/80" : "text-black/80"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ) : (
              ""
            ),
          )}
        </div>
        <div
          className={`border-t ${
            theme === "dark" ? "border-white/20" : "border-black/20"
          } p-4`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-full ${
                theme === "dark" ? "bg-white/20" : "bg-black/20"
              }`}
            ></div>
            <div className="flex-1">
              <div
                className={`text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-black/80"}`}
              >
                박태준
              </div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-white/80" : "text-black/80"
                }`}
              >
                pinedelo30@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
