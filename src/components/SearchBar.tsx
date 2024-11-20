import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8 px-4 group">
      <div className="absolute inset-y-0 left-6 sm:left-8 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-purple-400" />
      </div>
      <input
        type="text"
        placeholder="Search tools..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 sm:pl-16 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 
                 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                 placeholder-gray-500 text-white backdrop-blur-sm transition-all text-sm sm:text-base
                 hover:bg-white/10 hover:border-white/20"
      />
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                    opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
    </div>
  );
}

export default SearchBar;