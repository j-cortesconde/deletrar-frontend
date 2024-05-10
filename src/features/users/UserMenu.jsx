import { useState } from "react";
import UserPosts from "./UserPosts";

function UserMenu() {
  const options = ["publicaciones", "colecciones", "suscriptores", "suscripto"];
  const [selectedOption, setSelectedOption] = useState("publicaciones");

  const optionStyle =
    "text-3xl capitalize font-semibold p-4 pb-2 rounded-md hover:cursor-pointer hover:bg-slate-400 border-b-4";
  const inactiveStyle = optionStyle + " border-transparent";
  const activeStyle = optionStyle + " border-slate-500";

  return (
    <div className="border-t-2 border-stone-300 pt-2">
      <ul className="flex justify-center gap-28 pb-3">
        {options.map((option) => (
          <li
            key={option}
            className={option === selectedOption ? activeStyle : inactiveStyle}
            onClick={() => setSelectedOption(option)}
          >
            <p>{option}</p>
          </li>
        ))}
      </ul>

      {selectedOption === "publicaciones" && <UserPosts />}
    </div>
  );
}

export default UserMenu;
