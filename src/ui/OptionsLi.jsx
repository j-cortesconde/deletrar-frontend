import { useNavigate } from "react-router-dom";
import ScrollableLi from "./ScrollableLi";

function OptionsLi({ selected = false, children, onClick }) {
  return (
    <ScrollableLi onClick={onClick} selected={selected}>
      {children}
    </ScrollableLi>
  );
}

export default OptionsLi;
