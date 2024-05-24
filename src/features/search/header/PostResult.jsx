import { Link, useNavigate } from "react-router-dom";
import ScrollableLi from "../../../ui/ScrollableLi";

function PostResult({ selected = false, to, result }) {
  const navigate = useNavigate();

  const baseP = "truncate text-lg";
  const selectedP = " whitespace-normal break-normal p-1";
  const pStyle = selected ? baseP + selectedP : baseP;

  return (
    <ScrollableLi selected={selected} onClick={() => navigate(to)}>
      <Link to={to} className="align-middle">
        <span>{result.title}</span>
        <span className="text-lg"> - {result.author.name}</span>
      </Link>
      <p className={pStyle}>{result.summary}</p>
    </ScrollableLi>
  );
}

export default PostResult;
