import { router } from "@/routes";
import { App, ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

// dayjs에 한글 로케일 설정
dayjs.locale("ko");

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          colorPrimary: "#FD6B09",
        },
      }}
    >
      <App className="h-full">
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  </React.StrictMode>,
);
