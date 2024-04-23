import { Link } from "react-router-dom";

function OptionsLink({ selected = false, to, children, onClick }) {
  const baseStyle =
    "border-stone-300 p-0.5 w-full hover:bg-slate-300 hover:cursor-pointer truncate px-3 py-1";
  const selectedStyle = " bg-slate-400 font-semibold";
  const style = selected ? baseStyle + selectedStyle : baseStyle;

  return (
    <Link to={to} onClick={onClick} className={style}>
      {children}
    </Link>
  );
}

export default OptionsLink;
