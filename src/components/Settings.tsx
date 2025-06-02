import { ColorPicker } from "antd";
import { useState } from "react";

const Settings = () => {
  const [color, setColor] = useState<string>("#FD6B09");
  return (
    <div className="mt-5 w-full border-t border-gray-200">
      <div className="mt-5 flex w-[80%] justify-between">
        <span>Theme</span>
        <ColorPicker
          defaultValue={color}
          showText
          allowClear
          onChangeComplete={(picked) => {
            setColor(picked.toHexString());
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
