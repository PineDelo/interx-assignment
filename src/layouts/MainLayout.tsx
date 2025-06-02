import { Layout, Modal } from "antd";
import { Outlet } from "react-router-dom";
import Settings from "../components/Settings";
import { useThemeStore } from "../store/themeStore";
import Header from "./Header";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { isModalOpen, closeModal } = useThemeStore();

  return (
    <Layout className="flex h-screen bg-gray-50">
      <Modal
        title="설정"
        open={isModalOpen}
        onCancel={closeModal}
        // footer={null}
      >
        <Settings />
      </Modal>
      <Sidebar />
      <Layout>
        <Header />
        <Content className="flex flex-col">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
