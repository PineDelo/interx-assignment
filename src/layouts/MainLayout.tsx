import logo from "@/assets/logo-hd.png";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const { Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const MainLayout: React.FC = () => {
  return (
    <Layout className="size-full">
      <Sider style={siderStyle}>
        <div className="flex items-center justify-center p-5">
          <img src={logo} alt="logo" />
        </div>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Header />
      <Content className="flex flex-col">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
