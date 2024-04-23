import { useEffect, useRef, useState } from "react";
import OptionsLink from "../../ui/OptionsLink";
import { useLogout } from "../authentication/useLogout";

function UserOptions({ user, setDisplayOptions }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const optionsRef = useRef(null);
  const { logout, isLoading } = useLogout();

  // Adds keyboard navigation to the options list
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) => (prevIndex + 1) % optionsRef.current.children.length,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) =>
              (prevIndex - 1 + optionsRef.current.children.length) %
              optionsRef.current.children.length,
          );
          break;
        case "Enter":
          e.preventDefault();
          optionsRef.current.children[selectedIndex].click();
          break;
        case "Escape":
          e.preventDefault();
          setDisplayOptions(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <div
      ref={optionsRef}
      className="absolute top-[110%] z-50 flex w-full flex-col gap-1 rounded-xl  bg-slate-200 text-right "
    >
      <OptionsLink to={`/user/${user._id}`} selected={selectedIndex === 0}>
        Profile
      </OptionsLink>
      <OptionsLink to={`/settings`} selected={selectedIndex === 1}>
        Settings
      </OptionsLink>
      <OptionsLink to={`/invite`} selected={selectedIndex === 2}>
        Invite
      </OptionsLink>
      <OptionsLink to={`/help`} selected={selectedIndex === 3}>
        Help
      </OptionsLink>
      <OptionsLink onClick={logout} selected={selectedIndex === 4}>
        Log out
      </OptionsLink>
    </div>
  );
}

export default UserOptions;
