import { useClickOutside } from "../hooks/useClickOutside";
import { PiXBold } from "react-icons/pi";

function Modal({ children, handleClose }) {
  const { elementRef } = useClickOutside(handleClose);

  return (
    <div className="fixed left-0 top-0 z-[1000] h-screen w-screen backdrop-blur-sm transition-all duration-500">
      <div
        ref={elementRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-slate-400 px-10 py-10 shadow-lg transition-all duration-500"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-1 translate-x-3 transform rounded-sm border-none bg-none p-2 transition-all duration-200 hover:text-slate-950"
        >
          <PiXBold />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
