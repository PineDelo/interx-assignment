import logoImage from "@/assets/logo.png";
import { useThemeStore } from "@/store/themeStore";
import type { SidebarProps } from "@/types";
import { MenuUnfoldOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useModalStore } from "../store/modalStore";

const Header: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { setSettingModal } = useModalStore();
  const { theme } = useThemeStore();
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        borderBottom: "1px solid #e0e0e0",
        background: "transparent",
        boxSizing: "border-box",
        height: "56px",
      }}
    >
      <div
        className={`flex w-full justify-between px-7 leading-[56px] ${theme === "dark" ? "text-white" : "text-black"} `}
      >
        <div className="flex cursor-pointer items-center gap-8 align-middle">
          {!isSidebarOpen && (
            <>
              <img src={logoImage} alt="logo" className="h-[30px] w-[30px]" />
              <MenuUnfoldOutlined
                className="text-2xl hover:hover:opacity-50"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </>
          )}
        </div>
        <div className="mt-0.5 cursor-pointer" onClick={setSettingModal}>
          <SettingOutlined className="text-2xl hover:hover:opacity-50" />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
