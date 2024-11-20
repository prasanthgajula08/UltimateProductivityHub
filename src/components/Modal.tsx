import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Tool } from '../types';

interface ModalProps {
  tool: Tool;
}

const Modal: React.FC<ModalProps> = ({ tool }) => {
  const closeModal = useStore((state) => state.closeModal);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#0F111A]/90 rounded-2xl p-8 max-w-xl w-full mx-4 border border-white/10 shadow-2xl shadow-purple-500/10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            {tool.name}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {tool.component ? (
            <tool.component />
          ) : (
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400">This feature is coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;