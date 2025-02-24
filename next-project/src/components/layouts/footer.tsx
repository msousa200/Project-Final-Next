"use client";
import React from 'react';
import Styles from './footer.module.css'; 

export default function Footer() {
  return (
    <footer className={Styles.footerPage}>
      <p>&copy; {new Date().getFullYear()} Loja de Relógios. Todos os direitos reservados.</p>
    </footer>
  );
}