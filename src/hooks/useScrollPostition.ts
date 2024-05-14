import { useState, useEffect } from "react";

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update scrollY state with the current scroll position
      setScrollY(window.scrollY);
    };

    // Add event listener to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  return scrollY;
}

export default useScrollPosition;
