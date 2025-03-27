/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { clearUser, setUser } from '@/features/cartSlice';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { getProducts } from '@/data/products'; 
import { clearAllFilters } from '@/utils/filterUtils'; 

const extractTextFromHTML = (html: string): string => {
  if (typeof window !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const userId = useSelector((state: RootState) => state.cart.userId);
  const dispatch = useDispatch();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const { data: session, status } = useSession(); 
  const isAuthenticated = !!session?.user;

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const products = await getProducts();
      
      const uniqueWords = new Set<string>();
      
      products.forEach(product => {
        const cleanDescription = product.description.includes('<') 
          ? extractTextFromHTML(product.description)
          : product.description;
        
        const text = `${product.name} ${cleanDescription}`.toLowerCase();
        
        const allWords = text.split(/\s+/);
        
        allWords
          .filter(word => 
            word.startsWith(query.toLowerCase()) && 
            word.length >= 3 && 
            !["com", "para", "que", "dos", "das", "por", "uma"].includes(word)
          )
          .forEach(word => uniqueWords.add(word.charAt(0).toUpperCase() + word.slice(1)));
      });
      
      const wordSuggestions = Array.from(uniqueWords)
        .sort()
        .slice(0, 6);
      
      setSuggestions(wordSuggestions);
      setShowSuggestions(wordSuggestions.length > 0);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = async (suggestion: string) => {
    try {
      await router.push(`/pesquisa?q=${encodeURIComponent(suggestion.trim())}`);
      
      setSearchQuery('');
      setShowSuggestions(false);
      
      if (isMenuOpen) {
        closeMenu();
      }
    } catch (error) {
      console.error('Erro ao redirecionar para a página de pesquisa:', error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/me')
        .then(res => res.json())
        .then(userData => {
          dispatch(setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            dateOfBirth: userData.dateOfBirth || "", 
          }));
        })
        .catch(error => console.error("Erro ao buscar dados do usuário:", error));
    }
  }, [session, dispatch]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert('Por favor, insira um termo de pesquisa.');
      return;
    }

    setIsLoading(true);

    try {
      await router.push(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`);

      setSearchQuery('');
      setShowSuggestions(false);

      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.error('Erro ao redirecionar para a página de pesquisa:', error);
      alert('Ocorreu um erro ao processar sua pesquisa. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ 
      redirect: true, 
      callbackUrl: '/' 
    });
    
    dispatch(clearUser());
    
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

  const pathname = usePathname();
  const isCheckoutPage = pathname === '/checkout';
  const isSuccessPage = pathname === '/success' || pathname === '/checkout/success'; 

  const handleNavigation = () => {
    clearAllFilters();
  };

  if (isSuccessPage) {
    return (
      <div className="fixed top-0 left-0 w-full h-[80px] md:h-[100px] flex items-center justify-center px-4 md:px-10 bg-[#d2d1cd] border-b border-[#e0e0e0] z-[1000] shadow-md">
        {/* Apenas o logo centralizado */}
        <Link href="/">
          <Image
            src="/logotipo.jpg"
            alt="Logo da empresa"
            width={180}
            height={60}
            className="max-w-[120px] md:max-w-[180px] h-auto"
          />
        </Link>
      </div>
    );
  }

  if (isCheckoutPage) {
    return (
      <div className="fixed top-0 left-0 w-full h-[80px] md:h-[100px] flex items-center justify-between px-4 md:px-10 bg-[#d2d1cd] border-b border-[#e0e0e0] z-[1000] shadow-md">
        {/* Botão Voltar ao Carrinho */}
        <Link 
          href="/carrinho" 
          className="flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white bg-opacity-80 text-[#333] hover:bg-opacity-100 hover:text-black transition-all shadow-sm hover:shadow md:border-none md:bg-transparent md:shadow-none md:justify-start"
        >
          <FaArrowLeft className="text-sm md:text-base md:mr-2" />
          <span className="font-medium text-xs md:text-base ml-1 md:ml-0">
            <span className="hidden md:inline">Voltar ao carrinho</span>
            <span className="inline md:hidden">Voltar</span>
          </span>
        </Link>
        
        {/* Logo centralizado */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logotipo.jpg"
              alt="Logo da empresa"
              width={180}
              height={60}
              className="max-w-[100px] md:max-w-[180px] h-auto"
            />
          </Link>
        </div>
        
        {/* Espaço vazio para manter o balanceamento */}
        <div className="w-[150px]"></div>
      </div>
    );
  }

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
          <Link 
            href="/" 
            onClick={handleNavigation} 
            className="text-[#333] font-medium text-sm md:text-base px-2 md:px-4 py-2 relative transition-colors hover:text-black"
          >
            Home
            <span className="absolute left-2 md:left-4 right-2 md:right-4 bottom-0 h-[2px] bg-[#333] transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
          </Link>
          <Link 
            href="/men" 
            onClick={handleNavigation} 
            className="text-[#333] font-medium text-sm md:text-base px-2 md:px-4 py-2 relative transition-colors hover:text-black"
          >
            Men
            <span className="absolute left-2 md:left-4 right-2 md:right-4 bottom-0 h-[2px] bg-[#333] transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
          </Link>
          <Link 
            href="/women" 
            onClick={handleNavigation} 
            className="text-[#333] font-medium text-sm md:text-base px-2 md:px-4 py-2 relative transition-colors hover:text-black"
          >
            Women
            <span className="absolute left-2 md:left-4 right-2 md:right-4 bottom-0 h-[2px] bg-[#333] transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
          </Link>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1">
          <Link href="/" onClick={handleNavigation}>
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
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value.trim()) {
                    setShowSuggestions(false);
                  }
                }}
                onFocus={() => {
                  if (searchQuery.trim() && suggestions.length > 0) 
                    setShowSuggestions(true);
                }}
                className="w-[120px] lg:w-[200px] px-3 py-2 border border-[#e0e0e0] rounded-full text-sm outline-none transition-all focus:border-black focus:shadow-md"
                aria-label="Campo de pesquisa"
              />
              
              {/* Botão X para limpar a pesquisa (aparece apenas quando há texto) */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  aria-label="Limpar pesquisa"
                >
                  <FaTimes />
                </button>
              )}
              
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#333] hover:text-black transition-colors"
                aria-label="Pesquisar"
              >
                {isLoading ? (
                  <div className="animate-spin">
                    <FaSearch />
                  </div>
                ) : (
                  <FaSearch />
                )}
              </button>
              
              {/* Caixa de sugestões */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={suggestionRef}
                  className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <div className="py-1 px-3 text-xs text-gray-500 border-b">Sugestões:</div>
                  <ul className="py-1">
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex items-center"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <FaSearch className="text-gray-400 mr-2 text-xs" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            <div className={`absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 ${isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
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
        <div className="md:hidden flex gap-4 items-center relative">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-[#333] text-2xl transition-colors hover:text-black p-2"
            >
              <FaUser aria-label="Perfil" />
            </button>
            
            {/* Dropdown do Perfil - Versão Mobile */}
            {isProfileOpen && (
              <div className="absolute top-12 -right-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[1001]">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-4 text-gray-700 hover:bg-gray-100 border-b"
                      onClick={() => {
                        setIsProfileOpen(false);
                        console.log("Navegando para perfil");
                      }}
                    >
                      <span className="flex items-center">
                        <FaUser className="inline-block mr-2" />
                        A Minha Conta
                      </span>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-4 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      <span>Terminar Sessão</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-4 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <span className="flex items-center">
                      <FaUser className="inline-block mr-2" />
                      Entrar
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
          
          <Link href="/carrinho" className="text-[#333] text-2xl transition-colors hover:text-black p-2 relative">
            <FaShoppingCart />
            {cartItemsCount > 0 && (
              <div className="absolute -top-3 -right-2 bg-black text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
                {cartItemsCount}
              </div>
            )}
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
              <Link 
                href="/" 
                className="text-[#333] font-medium py-3 w-full text-center" 
                onClick={() => {
                  toggleMenu();
                  handleNavigation();
                }}
              >
                Home
              </Link>
              <Link 
                href="/men" 
                className="text-[#333] font-medium py-3 w-full text-center" 
                onClick={() => {
                  toggleMenu();
                  handleNavigation();
                }}
              >
                Men
              </Link>
              <Link 
                href="/women" 
                className="text-[#333] font-medium py-3 w-full text-center" 
                onClick={() => {
                  toggleMenu();
                  handleNavigation();
                }}
              >
                Women
              </Link>

              {/* Barra de Pesquisa Mobile */}
              <div className="mt-4 w-full px-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value.trim()) {
                        setShowSuggestions(false);
                      }
                    }}
                    onFocus={() => {
                      if (searchQuery.trim() && suggestions.length > 0) 
                        setShowSuggestions(true);
                    }}
                    className="w-full px-4 py-2 border border-[#e0e0e0] rounded-full text-sm outline-none transition-all focus:border-black focus:shadow-md"
                  />
                  
                  {/* Botão X para limpar a pesquisa mobile */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                      aria-label="Limpar pesquisa"
                    >
                      <FaTimes />
                    </button>
                  )}
                  
                  {/* Botão de busca */}
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#333] hover:text-black transition-colors"
                    aria-label="Pesquisar"
                  >
                    {isLoading ? (
                      <div className="animate-spin">
                        <FaSearch />
                      </div>
                    ) : (
                      <FaSearch />
                    )}
                  </button>
                  
                  {/* Sugestões para mobile */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div 
                      ref={suggestionRef}
                      className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <div className="py-1 px-3 text-xs text-gray-500 border-b">Sugestões:</div>
                      <ul className="py-1">
                        {suggestions.map((suggestion, index) => (
                          <li 
                            key={index} 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex items-center"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <FaSearch className="text-gray-400 mr-2 text-xs" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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