import { FooterProps } from "../../types";

import "./Footer.css";

const Footer = ({ filter, setFilter, itemsLeft, clearCompleted }: FooterProps) => {
  return (
    <div className="footer">
      <span className="items-left-text">{itemsLeft} {itemsLeft !== 1 ? "items" : "item"} left</span>

      <div className="footer-buttons">
        <button className={`button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        <button className={`button ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>Active</button>
        <button className={`button ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <button className="button" onClick={clearCompleted}>Clear completed</button>
    </div>
  );
};

export default Footer;