import React from 'react';
import { Tool } from '../types';
import { useStore } from '../store/useStore';

interface ToolCardProps extends Tool {}

const ToolCard: React.FC<ToolCardProps> = (tool) => {
  const openModal = useStore((state) => state.openModal);

  return (
    <div
      onClick={() => !tool.comingSoon && openModal(tool)}
      className={`relative group w-full aspect-square rounded-2xl p-6
                 bg-gradient-to-br ${tool.color}
                 border border-white/10 backdrop-blur-sm
                 flex flex-col items-center justify-center gap-4
                 hover:border-white/20 transition-all duration-300
                 ${!tool.comingSoon && 'cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10'}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 
                    group-hover:from-purple-500/10 group-hover:to-pink-500/10 
                    rounded-2xl transition-all duration-300" />
      
      <div className={`${tool.iconColor} transition-transform duration-300 group-hover:scale-110 relative z-10`}>
        <tool.icon size={32} />
      </div>
      <span className="text-white/90 font-medium text-sm relative z-10">{tool.name}</span>
      <p className="text-xs text-white/50 text-center relative z-10">{tool.description}</p>
      
      {tool.comingSoon && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
          <span className="text-xs text-white/70">Coming Soon</span>
        </div>
      )}
    </div>
  );
};

export default ToolCard;