import React from "react";

const MenuModal = ({ menu }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return (
    <div
      style={{
        maxHeight: "500px",
        maxWidth: "500px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={`${baseUrl}/${menu}`}
        alt="menu"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default MenuModal;
