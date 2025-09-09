// src/pages/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      {/* 👇 aquí se cargan las páginas hijas */}
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
};
