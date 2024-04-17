import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function NonUserOptions() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-10">
      <Link to="/request" className="text-center text-2xl">
        Request account
      </Link>
      <Button size="medium" onClick={() => navigate("/login")}>
        Login
      </Button>
    </div>
  );
}

export default NonUserOptions;
