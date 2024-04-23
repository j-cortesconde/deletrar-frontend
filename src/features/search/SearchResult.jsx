import { Link, useNavigate } from "react-router-dom";

function SearchResult({ selected = false, to, result }) {
  const navigate = useNavigate();
  const baseStyle =
    "border-stone-300 p-0.5 w-full my-1 hover:bg-slate-300 hover:cursor-pointer truncate px-2 py-1";
  const selectedStyle = " bg-slate-400 font-semibold";
  const style = selected ? baseStyle + selectedStyle : baseStyle;

  return (
    <li className={style} onClick={() => navigate(to)}>
      <Link to={to} className="align-middle">
        <span>{result.title}</span>
        <span className="text-lg"> - {result.author.name}</span>
      </Link>
    </li>
  );
}

export default SearchResult;
