import type { InputRef } from "antd";
import type { Dispatch, SetStateAction } from "react";

export interface ThemeProps {
  theme: "light" | "dark";
  sidebarTheme: string;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ChatProps {
  role: string;
  content: string;
  timestamp: string;
}

export interface InputMessageProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  inputRef: React.RefObject<InputRef | null>;
}
