"use client";
import React, { useState } from 'react';
import { brands } from '@/data/brands';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface BrandFilterProps {
  selectedBrands: number[];
  onBrandChange: (brandId: number) => void;
  onClearFilters: () => void;
}

const BrandFilter = ({ selectedBrands, onBrandChange, onClearFilters }: BrandFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      {/* Botão de filtro para mobile */}
      <button
        onClick={toggleFilter}
        className="md:hidden fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50 hover:bg-gray-700 transition-colors duration-200 ease-in-out flex items-center gap-2"
      >
        {isFilterOpen ? <FaTimes className="text-xl" /> : <FaFilter className="text-xl" />}
        <span className="text-sm">{isFilterOpen ? "Fechar" : "Filtrar"}</span>
      </button>

      {/* Filtro de marcas */}
      <div
        className={`fixed md:static inset-0 md:inset-auto bg-white md:bg-transparent z-40 transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="w-[250px] md:w-[180px] h-full md:h-auto p-5 bg-gray-50 border-r border-gray-200 md:mr-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Marcas</h3>
          </div>
          
          <ul className="list-none p-0 m-0 flex-grow">
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
          
          {/* Botão de limpar filtros no final */}
          {selectedBrands.length > 0 && (
            <button
              onClick={onClearFilters}
              className="mt-4 text-sm bg-red-50 text-red-600 py-2 px-4 rounded-md hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-1 font-medium w-full"
            >
              <FaTimes className="text-xs" />
              Limpar filtros
            </button>
          )}
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