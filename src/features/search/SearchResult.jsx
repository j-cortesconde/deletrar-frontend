import { Link, useNavigate } from "react-router-dom";

function SearchResult({ selected = false, to, result }) {
  const navigate = useNavigate();

  const baseLi =
    "border-stone-300 p-0.5 w-full my-1 hover:bg-slate-300 hover:cursor-pointer truncate px-2 py-1";
  const selectedLi = " bg-slate-400 font-semibold";
  const liStyle = selected ? baseLi + selectedLi : baseLi;

  const baseP = "truncate text-lg";
  const selectedP = " whitespace-normal break-normal p-1";
  const pStyle = selected ? baseP + selectedP : baseP;

  return (
    <li className={liStyle} onClick={() => navigate(to)}>
      <Link to={to} className="align-middle">
        <span>{result.title}</span>
        <span className="text-lg"> - {result.author.name}</span>
      </Link>
      <p className={pStyle}>{result.summary}</p>
    </li>
  );
}

export default SearchResult;
