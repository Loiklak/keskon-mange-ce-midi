import { useState, useEffect } from "react";

function useScrollPosition() {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Update scrollY state with the current scroll position
      setScroll({ x: window.scrollX, y: window.scrollY });
    };

    // Add event listener to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  return scroll;
}

export default useScrollPosition;
