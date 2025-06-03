import { useThemeStore } from "@/store/themeStore";
import type { InputMessageProps } from "@/types";
import { PictureOutlined, SendOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";

const InputMessage: React.FC<InputMessageProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  inputRef,
}) => {
  //stores
  const { theme } = useThemeStore();
  // focus state
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`mr-3 mb-5 w-[70%] ${
        theme === "dark" ? "border-white/20" : "border-black/20"
      } flex items-center justify-center`}
    >
      <div
        className={`relative flex w-full flex-col !rounded-[28px] border-2 bg-white p-4 hover:border-[#FD6B09] ${
          isFocused ? "border-[#FD6B09]" : "border-[#e0e0e0]"
        } rounded-md`}
      >
        <Input.TextArea
          ref={inputRef}
          value={input}
          autoSize={{ minRows: 1, maxRows: 10 }}
          style={{
            border: "none",
            boxShadow: "none",
            resize: "none",
            padding: 4,
            width: "100%",
          }}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="메세지 내용을 입력하세요..."
          disabled={isLoading}
          className={`${
            theme === "dark"
              ? "border-white/20 bg-black text-white"
              : "border-black/20 bg-white text-black"
          }`}
        />
        <div className="mt-2 flex justify-between">
          <Button
            style={{ border: "none" }}
            className={`hover:!bg-[#FD6B09] [&:hover_svg]:text-white ${
              theme === "dark"
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
            shape="circle"
            size="large"
            color="default"
            variant="text"
            icon={<PictureOutlined style={{ color: "gray", fontSize: 18 }} />}
          />

          <Button
            style={{
              border: "none",
            }}
            type="primary"
            size="large"
            shape="circle"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!input.trim() || isLoading}
            icon={
              isLoading ? (
                <SyncOutlined spin style={{ fontSize: 18 }} />
              ) : (
                <SendOutlined style={{ marginLeft: 2, fontSize: 18 }} />
              )
            }
            className={`hover:!bg-[#FD6B09] [&:hover_svg]:text-white ${
              theme === "dark"
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
