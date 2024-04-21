import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Navlink.css";

const Navlink = ({ children, href }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="Navlink-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={href} className="Navlink-link">
        {children}
        <motion.span
          className="Navlink-underline"
          style={{
            scaleX: hovered ? 1 : 0,
          }}
        />
      </a>
    </div>
  );
};

export default Navlink;
