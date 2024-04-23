import { useEffect, useState } from "react";

export function useScrollList(listRef, onExit) {
  const [selectedIndex, setSelectedIndex] = useState(0); // Tracks the selected child element in the list

  // Adds an event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) => (prevIndex + 1) % listRef.current.children.length,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) =>
              (prevIndex - 1 + listRef.current.children.length) %
              listRef.current.children.length,
          );
          break;
        case "Enter":
          e.preventDefault();
          listRef.current.children[selectedIndex].click();
          console.log(listRef.current.children[selectedIndex]);
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
