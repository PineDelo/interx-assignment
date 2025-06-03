import { router } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>,
);
