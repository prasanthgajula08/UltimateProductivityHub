import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ToolCard from './components/ToolCard';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import tools from './data/tools';
import { useStore } from './store/useStore';

const categories = ['All Tools', 'Time Management', 'Productivity', 'Wellness', 'Utilities'];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const { modal } = useStore();

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All Tools' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#0F111A] text-white overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-900/10 to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />
      </div>
      
      {/* Animated orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="fixed top-3/4 -right-32 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="fixed bottom-1/4 -left-32 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl animate-float-slow" />
      
      <div className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 animate-gradient">
              Productivity Hub
            </h1>
            <p className="text-gray-400 text-lg">
              Your essential tools in one beautiful space, designed to enhance your
              productivity and well-being
            </p>
          </div>

          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all
                  ${activeCategory === category
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 animate-fade-in">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ToolCard {...tool} />
              </div>
            ))}
          </div>

          <div className="fixed bottom-4 right-4">
            <button
              className="p-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                         hover:from-purple-500/20 hover:to-pink-500/20 transition-all
                         hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
              aria-label="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {modal.isOpen && modal.activeTool && (
        <Modal tool={modal.activeTool} />
      )}
    </div>
  );
}

export default App;