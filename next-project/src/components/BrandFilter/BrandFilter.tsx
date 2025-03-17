"use client";
import React, { useState } from 'react';
import { brands } from '@/data/brands';
import { FaFilter } from 'react-icons/fa'; 

interface BrandFilterProps {
  selectedBrands: number[];
  onBrandChange: (brandId: number) => void;
}

const BrandFilter = ({ selectedBrands, onBrandChange }: BrandFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); 

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      {/* Botão de filtro para mobile */}
      <button
        onClick={toggleFilter}
        className="md:hidden fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50"
      >
        <FaFilter className="text-xl" />
      </button>

      {/* Filtro de marcas */}
      <div
        className={`fixed md:static inset-0 md:inset-auto bg-white md:bg-transparent z-40 transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="w-[250px] md:w-[180px] h-full md:h-auto p-5 bg-gray-50 border-r border-gray-200 md:mr-5">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Marcas</h3>
          <ul className="list-none p-0 m-0">
            {brands.map((brand) => (
              <li key={brand.id} className="mb-3">
                <label className="flex items-center cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => onBrandChange(brand.id)}
                    className="mr-2 cursor-pointer accent-gray-800"
                  />
                  <span>{brand.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay para mobile (fechar o filtro ao clicar fora) */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleFilter}
        ></div>
      )}
    </>
  );
};

export default BrandFilter;