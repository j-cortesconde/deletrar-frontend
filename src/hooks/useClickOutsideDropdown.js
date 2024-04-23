import { useEffect } from "react";

export function useClickOutsideDropdown(dropdownButtonRef, handleDropdownExit) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        // Click occurred outside of the dropdown Button, close the dropdown
        handleDropdownExit();
      }
    };

    // Attach event listener to detect clicks outside of the dropdown Button
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownButtonRef, handleDropdownExit]);
}
