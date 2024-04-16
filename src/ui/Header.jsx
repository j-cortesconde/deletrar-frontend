import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserHeader from "./UserHeader";

function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-200 p-3">
      <Logo />
      <SearchBar />
      {/* <UserHeader /> */}
    </header>
  );
}

export default Header;
