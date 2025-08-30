import React from "react";

function Toast({ message, visible }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#333",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        zIndex: 999,
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
