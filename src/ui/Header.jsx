import Logo from "./Logo";
import SearchBar from "../features/search/SearchBar";
import UserOptions from "./UserOptions";
import NonUserOptions from "./NonUserOptions";

function Header({ user }) {
  return (
    <header className="flex items-center justify-between bg-slate-200 px-10 py-4">
      <Logo />
      <SearchBar />
      {user ? <UserOptions user={user} /> : <NonUserOptions />}
    </header>
  );
}

export default Header;
