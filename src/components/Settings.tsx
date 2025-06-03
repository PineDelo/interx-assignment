import { useThemeStore } from "@/store/themeStore";
import { ColorPicker, Switch } from "antd";

const Settings = () => {
  const { theme, setTheme, sidebarTheme, setSidebarTheme } = useThemeStore();

  return (
    <div className="mt-5 flex w-full flex-col items-center border-t border-gray-200">
      <div className="mt-10 flex w-[80%] justify-between">
        <span>Theme</span>
        <Switch
          checkedChildren="dark"
          unCheckedChildren="light"
          defaultChecked={theme === "light" ? false : true}
          onChange={(checked) => {
            setTheme(checked ? "dark" : "light");
          }}
        />
      </div>
      <div className="mt-10 mb-10 flex w-[80%] justify-between">
        <span>Sidebar-Theme</span>
        <ColorPicker
          defaultValue={sidebarTheme}
          showText
          allowClear
          onChangeComplete={(picked) => {
            setSidebarTheme(picked.toHexString());
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
