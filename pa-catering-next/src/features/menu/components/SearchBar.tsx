import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <article className="sticky bg-black/50 blur-[0.1px] backdrop-blur-md top-9 m-0 shadow-none p-4 rounded-none z-20">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IoSearchOutline className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="search"
          id="menu-search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for food or categories..."
          className="block w-full rounded-lg border border-gray-700 bg-black/30 pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:border-red-500 focus:outline-none"
          autoComplete="off"
        />
      </div>
    </article>
  );
};

export default SearchBar;