import { useNavigate } from "react-router-dom";
import Feed from "../features/feed/Feed";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/comment/674a1777a6c2f24a56ff60fb");
        }}
      >
        Botoneá
      </button>
      <Feed />
    </div>
  );
}

export default Home;
