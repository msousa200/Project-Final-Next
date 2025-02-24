"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Styles from "./header.module.css";
import Image from 'next/image';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/pesquisa?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className={Styles.container}>
      {}
      <div className={Styles.menuButtonContainer}>
        <button className={Styles.menuButton} onClick={toggleMenu}>
          {menuOpen ? "X Fechar" : "☰ Menu"}
        </button>

        {}
        {menuOpen && (
          <div className={Styles.dropdownMenu}>
            <Link href="/marcas/rolex">Rolex</Link>
            <Link href="/marcas/omega">Omega</Link>
            <Link href="/marcas/tagheuer">Tag Heuer</Link>
            <Link href="/marcas/seiko">Seiko</Link>
            <Link href="/marcas/citizen">Citizen</Link>
          </div>
        )}
      </div>

      {}
      <div className={Styles.logo}>
        <Link href="/">
          <Image src="/logotipo.jpg" alt="Logo da empresa" width={180} height={60}  />
        </Link>
      </div>

      {}
      <div className={Styles.menu}>
        <div className={Styles.searchBar}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <Link href="/perfil" className={Styles.icon}>
          <FaUser />
        </Link>
        <Link href="/carrinho" className={Styles.icon}>
          <FaShoppingCart />
        </Link>
      </div>
    </div>
  );
};

export default Header;
