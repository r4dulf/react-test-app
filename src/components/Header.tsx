import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export function Header() {
  return (
    <header>
      <div className="logo">Test App</div>

      <nav>
        <Link to="/">Camera</Link>
        <Link to="/pokemon-app">Pokemon API</Link>
      </nav>
    </header>
  );
}
