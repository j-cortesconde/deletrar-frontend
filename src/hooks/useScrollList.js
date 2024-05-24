// IMPORTANT. This was meant to work if:
//  1) Under the GeneralResultList Posts are rendered first and Users second
//  2) Both Posts and Users are rendered as separate <ul>s with their specific <li>s
import { useEffect, useRef, useState } from "react";

export function useScrollList(onExit) {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Tracks the selected child element in the list
  // Adds an event listener for keyboard navigation
  useEffect(() => {
    if (!listRef.current) return;

    const handleKeyDown = (e) => {
      // Function to recursively find all final <li> elements
      const findFinalLiElements = (ulElement) => {
        let finalLiElements = [];
        const childLiElements = Array.from(ulElement.children).filter(
          (child) => child.tagName === "LI",
        );

        childLiElements.forEach((child) => {
          const nestedUl = child.querySelector("ul");
          if (nestedUl) {
            finalLiElements = finalLiElements.concat(
              findFinalLiElements(nestedUl),
            );
          } else {
            finalLiElements.push(child);
          }
        });

        return finalLiElements;
      };

      // Setting all final <li> elements
      const finalLiElements = findFinalLiElements(listRef.current);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) => (prevIndex + 1) % (finalLiElements.length + 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prevIndex) =>
              (prevIndex - 1 + (finalLiElements.length + 1)) %
              (finalLiElements.length + 1),
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex !== -1 && selectedIndex < finalLiElements.length)
            finalLiElements[selectedIndex].click();
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

  return { listRef, selectedIndex };
}
