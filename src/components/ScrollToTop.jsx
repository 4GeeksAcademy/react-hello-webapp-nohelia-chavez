// src/components/scrollToTop.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;

ScrollToTop.propTypes = {
  children: PropTypes.any
};
