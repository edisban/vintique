import React, { useEffect, useState } from "react";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.body;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button className="dark-toggle" onClick={() => setIsDark(!isDark)}>
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}

export default DarkModeToggle;
