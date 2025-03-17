"use client";
import React from 'react';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaCcAmex } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#d2d1cd] text-[#333] text-center py-5 font-sans text-sm border-t border-[#e0e0e0] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] mt-10">
      <div className="flex justify-center items-center gap-5">
        <p className="m-0 font-medium">
          &copy; {new Date().getFullYear()} Loja de Relógios. Todos os direitos reservados.
        </p>
        <div className="flex gap-3">
          <FaCcVisa className="text-2xl text-[#333] transition-colors hover:text-black" />
          <FaCcMastercard className="text-2xl text-[#333] transition-colors hover:text-black" />
          <FaPaypal className="text-2xl text-[#333] transition-colors hover:text-black" />
          <FaCcAmex className="text-2xl text-[#333] transition-colors hover:text-black" />
        </div>
      </div>
    </footer>
  );
}