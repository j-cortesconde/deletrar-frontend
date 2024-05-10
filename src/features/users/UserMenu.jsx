import { useState } from "react";
import UserPosts from "./UserPosts";
import UserFollowing from "./UserFollowing";

function UserMenu() {
  const options = ["publicaciones", "colecciones", "suscriptores", "suscripto"];
  const [selectedOption, setSelectedOption] = useState("publicaciones");

  const optionStyle =
    "text-3xl capitalize font-semibold p-4 pb-2 rounded-md hover:cursor-pointer hover:bg-slate-400 border-b-4";
  const inactiveStyle = optionStyle + " border-transparent";
  const activeStyle = optionStyle + " border-slate-500";

  return (
    <>
      <ul className="my-4 flex justify-center gap-28 border-y-2 border-stone-300 pb-3 pt-2">
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
      {selectedOption === "suscripto" && <UserFollowing />}
    </>
  );
}

export default UserMenu;
