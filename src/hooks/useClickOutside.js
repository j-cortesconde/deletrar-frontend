import { useEffect, useRef } from "react";

export function useClickOutside(handler, listenCapturing = true) {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        // Click occurred outside of the element, close it
        handler();
      }
    };

    // Attach event listener to detect clicks outside of the element
    document.addEventListener("click", handleClickOutside, listenCapturing);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing,
      );
    };
  }, [handler, listenCapturing]);

  return { elementRef };
}
