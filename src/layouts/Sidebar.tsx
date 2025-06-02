import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import logoHd from "../assets/logo-hd.png";
import logoWhite from "../assets/logo-white.png";
import { useThemeStore } from "../store/themeStore";

const { Sider } = Layout;

const Sidebar = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Sider
      collapsible={false}
      theme={theme === "dark" ? "dark" : "light"}
      width={260}
      className={`flex h-full flex-col`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 align-middle">
          <img
            className="h-6 w-32"
            src={theme === "dark" ? logoWhite : logoHd}
            alt="logo"
            // className="h-8 w-auto"
          />
          {/* <Button
            onClick={toggleTheme}
            type="text"
            className="hover:bg-opacity-10 rounded-full !border-0 !shadow-none"
            
          > */}
          {theme === "dark" ? (
            <MenuFoldOutlined
              className="text-3xl hover:opacity-50"
              onClick={toggleTheme}
            />
          ) : (
            <MenuUnfoldOutlined
              className="text-3xl hover:opacity-50"
              onClick={toggleTheme}
            />
          )}
        </div>
        <div className="flex-1" />
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
              <div className="text-sm font-medium">User Name</div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-white/80" : "text-black/80"
                }`}
              >
                user@example.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
