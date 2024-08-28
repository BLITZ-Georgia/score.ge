"use client";
import { useLocalStorage } from "usehooks-ts";
import style from "./style.module.css";

const DarkModeButton = ({
  setChangeDarkMode,
  toggleDarkMode,
  changeDarkMode,
}: {
  setChangeDarkMode: any;
  toggleDarkMode: any;
  changeDarkMode: boolean;
}) => {
  const [mode] = useLocalStorage("theme", "light");

  return (
    <button
      id="dm-toggle"
      onClick={() => {
        const newMode = !changeDarkMode;
        setChangeDarkMode(newMode);
        toggleDarkMode(newMode);
      }}
    >
      <div className="van-div-7 north" original-title="Night Mode">
        <div className="van-div-8">
          <div
            className={`van-div-9 ${
              mode == "dark" ? style.darkModeChange : ""
            }`}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default DarkModeButton;
