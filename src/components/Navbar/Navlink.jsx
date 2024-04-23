import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Navlink.css";

const Navlink = ({ children, href }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="Navlink-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={href} className="Navlink-link">
        {children}
        <motion.span
          className="Navlink-underline"
          style={{
            scaleX: hovered ? 1 : 0,
          }}
        />
      </Link>
    </div>
  );
};

export default Navlink;
