import Settings from "@/components/Settings";
import { useAlertStore } from "@/store/alertStore";
import { useModalStore } from "@/store/modalStore";
import { useThemeStore } from "@/store/themeStore";
import { Alert, Layout, Modal } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { isSettingModal, setSettingModal } = useModalStore();
  const { isAlertError, alertMessage } = useAlertStore();
  const { theme } = useThemeStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <Layout className="flex h-screen">
      <Modal
        title="설정"
        open={isSettingModal}
        onCancel={setSettingModal}
        footer={null}
      >
        <Settings />
      </Modal>
      <div
        style={{
          width: isSidebarOpen ? 260 : 0,
          transition: "width 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <Layout
        style={{ backgroundColor: theme === "dark" ? "#212121" : "#ffffff" }}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Content className="flex flex-col">
          <Outlet />
        </Content>
      </Layout>
      {isAlertError && (
        <Alert
          style={{
            position: "fixed",
            top: 50,
            right: 50,
            zIndex: 1000,
            width: "400px",
          }}
          message="Error"
          description={alertMessage}
          type="error"
          showIcon
          closable
        />
      )}
    </Layout>
  );
};

export default MainLayout;
