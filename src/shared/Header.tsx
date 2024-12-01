import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Header.module.scss";
import logo from "../assets/logo.svg";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query === "") return;
    navigate(`/collection/${query}`);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        {/* Logo */}
        <Link to={"/"} className={styles.header_logo}>
          <img src={logo} width={40} height={40} />
        </Link>
        {/* Search */}
        <div className={styles.header_search}>
          <button onClick={handleSubmit}>
            <Search color="#767676" width={20} height={20} />
          </button>
          <form onSubmit={handleSubmit}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search photos and illustrations"
            />
          </form>
        </div>

        {/* Menu */}
        <div ref={menuRef} className={styles.header_menu}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button>
          {!isMenuOpen && (
            <div className={styles.header_menu_info}>
              <h2>Menu</h2>

              <Link to={"/"}>Account</Link>
              <Link to={"/"}>Settings</Link>
              <Link to={"/"}>About</Link>
              <Link to={"/"}>Blog</Link>
            </div>
          )}
        </div>
      </div>

      <div className={styles.header_container}>
        <div className={styles.header_categories}>
          <Link to={"collection/wallpapers"}>Wallpapers</Link>
          <Link to={"collection/nature"}>Nature</Link>
          <Link to={"collection/architecture"}>Architecture</Link>
          <Link to={"collection/animals"}>Animals</Link>
          <Link to={"collection/film"}>Film</Link>
          <Link to={"collection/film"}>Travel</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
