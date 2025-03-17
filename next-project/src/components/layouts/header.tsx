"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { clearUser, setUser } from '@/features/cartSlice';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.cart.userId);
  const dispatch = useDispatch();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const { data: session } = useSession(); 

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser({
        id: session.user.id as string,
        email: session.user.email as string,
        name: session.user.name as string
      }));
    }
  }, [session, dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/pesquisa?q=${encodeURIComponent(searchQuery)}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    dispatch(clearUser()); 
    router.push('/'); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAuthenticated = session?.user || userId;

  return (
    <>
      {/* Header Principal */}
      <div className="fixed top-0 left-0 w-full h-[80px] md:h-[100px] flex items-center justify-between px-4 md:px-10 bg-[#d2d1cd] border-b border-[#e0e0e0] z-[1000] shadow-md">
        {/* Ícone do Menu Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#333] text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links do Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1">
          <Link href="/" className="text-[#333] font-medium text-sm md:text-base px-2 md:px-4 py-2 relative transition-colors hover:text-black">
            Home
            <span className="absolute left-2 md:left-4 right-2 md:right-4 bottom-0 h-[2px] bg-[#333] transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
          </Link>
          <Link href="/men" className="text-[#333] font-medium text-sm md:text-base px-2 md:px-4 py-2 relative transition-colors hover:text-black">
            Men
            <span className="absolute left-2 md:left-4 right-2 md:right-4 bottom-0 h-[2px] bg-[#333] transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
          </Link>
          <Link href="/women" className="text-[#333] font-medium text-sm md:text-base px-2 md:px-4 py-2 relative transition-colors hover:text-black">
            Women
            <span className="absolute left-2 md:left-4 right-2 md:right-4 bottom-0 h-[2px] bg-[#333] transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
          </Link>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/logotipo.jpg"
              alt="Logo da empresa"
              width={180}
              height={60}
              className="max-w-[100px] md:max-w-[180px] h-auto transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Ícones e Barra de Pesquisa (Desktop) */}
        <div className="hidden md:flex gap-6 items-center flex-1 justify-end">
          {/* Barra de Pesquisa */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[120px] lg:w-[200px] px-3 py-2 border border-[#e0e0e0] rounded-full text-sm outline-none transition-all focus:border-black focus:shadow-md"
              />
            </form>
          </div>

          {/* Ícone do Perfil com Dropdown */}
          <div
            className="relative group"
            ref={profileRef}
          >
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-[#333] text-2xl transition-colors hover:text-black p-2"
            >
              <FaUser aria-label="Perfil" />
            </button>

            {/* Dropdown do Perfil */}
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    A Minha Conta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline-block mr-2" />
                    Terminar Sessão
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>

          {/* Ícone do Carrinho */}
          <div className="relative group">
            <Link 
              href="/carrinho" 
              className="text-[#333] text-2xl transition-all hover:text-black p-2 flex items-center"
            >
              <div className="relative">
                <FaShoppingCart aria-label="Carrinho" className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <div className="absolute -top-3 -right-2 bg-black text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 transform transition-transform group-hover:scale-110">
                    {cartItemsCount}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Ícones (Mobile) */}
        <div className="md:hidden flex gap-4 items-center">
          <Link
            href={userId ? "/profile" : "/login"}
            className="text-[#333] text-2xl transition-colors hover:text-black p-2"
          >
            <FaUser aria-label="Perfil" />
          </Link>
          <Link href="/carrinho" className="text-[#333] text-2xl transition-colors hover:text-black">
            <FaShoppingCart />
          </Link>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <>
          {/* Overlay para fechar o menu ao clicar fora */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMenu}
          ></div>

          {/* Conteúdo do Menu Mobile */}
          <div className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-[#d2d1cd] z-50 overflow-y-auto">
            <div className="flex flex-col items-center py-4">
              {/* Links do Menu */}
              <Link href="/" className="text-[#333] font-medium py-3 w-full text-center" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/men" className="text-[#333] font-medium py-3 w-full text-center" onClick={closeMenu}>
                Men
              </Link>
              <Link href="/women" className="text-[#333] font-medium py-3 w-full text-center" onClick={closeMenu}>
                Women
              </Link>

              {/* Barra de Pesquisa Mobile */}
              <div className="mt-4 w-full px-4">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-[#e0e0e0] rounded-full text-sm outline-none transition-all focus:border-black focus:shadow-md"
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;