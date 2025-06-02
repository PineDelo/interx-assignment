import { SettingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useThemeStore } from "../store/themeStore";

const Header: React.FC = () => {
  const { openModal } = useThemeStore();

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FD6B09",
      }}
    >
      <div></div>
      <div className="cursor-pointer text-white" onClick={openModal}>
        <SettingOutlined style={{ fontSize: "24px" }} />
      </div>
    </Layout.Header>
  );
};

export default Header;
