import { useEffect, useState } from "react";

export function useScrollList(listRef, onExit) {
  const [selectedIndex, setSelectedIndex] = useState(-1); // Tracks the selected child element in the list

  // Adds an event listener for keyboard navigation
  useEffect(() => {
    if (!listRef.current) return;
    const handleKeyDown = (e) => {
      const childLiElements = Array.from(listRef.current.children).filter(
        (child) => child.tagName === "LI",
      );
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) => (prevIndex + 1) % (childLiElements.length + 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) =>
              (prevIndex - 1 + (childLiElements.length + 1)) %
              (childLiElements.length + 1),
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex !== childLiElements.length && selectedIndex !== -1)
            childLiElements[selectedIndex].click();
          break;
        case "Escape":
          e.preventDefault();
          onExit();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, listRef, onExit]);

  return selectedIndex;
}
