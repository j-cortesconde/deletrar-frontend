import Logo from "./Logo";
import SearchBar from "../features/search/SearchBar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../features/users/useCurrentUser";
import UserOptions from "./UserOptions";
import NonUserOptions from "./NonUserOptions";

function Header() {
  const { user } = useCurrentUser();

  return (
    <header className="flex items-center justify-between bg-slate-200 px-10 py-4">
      <Logo />
      <SearchBar />
      {user ? <UserOptions user={user} /> : <NonUserOptions />}
    </header>
  );
}

export default Header;
