import React, { useState } from 'react';
import { Quote, RefreshCw, Heart } from 'lucide-react';
import { useQuery } from 'react-query';

interface QuoteData {
  content: string;
  author: string;
}

const DailyQuotes: React.FC = () => {
  const [favorites, setFavorites] = useState<QuoteData[]>([]);

  const { data: quote, refetch, isLoading } = useQuery<QuoteData>(
    'quote',
    async () => {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) throw new Error('Failed to fetch quote');
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const toggleFavorite = (quote: QuoteData) => {
    const exists = favorites.some(fav => fav.content === quote.content);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.content !== quote.content));
    } else {
      setFavorites([...favorites, quote]);
    }
  };

  const isCurrentQuoteFavorite = quote && 
    favorites.some(fav => fav.content === quote.content);

  return (
    <div className="space-y-8">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
        
        <div className="relative p-6 rounded-lg bg-white/5 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : quote ? (
            <>
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-purple-400 flex-shrink-0" />
                <p className="text-xl leading-relaxed">
                  {quote.content}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">― {quote.author}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => quote && toggleFavorite(quote)}
                    className={`p-2 rounded-lg transition-colors
                             ${isCurrentQuoteFavorite
                               ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                               : 'text-gray-400 hover:text-red-500 hover:bg-white/10'
                             }`}
                  >
                    <Heart size={20} />
                  </button>
                  <button
                    onClick={() => refetch()}
                    className="p-2 rounded-lg text-gray-400 hover:text-white 
                             hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400">
              Failed to load quote. Please try again.
            </div>
          )}
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-purple-400">Favorite Quotes</h3>
          <div className="space-y-4">
            {favorites.map((fav, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 
                         transition-all duration-300 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <p>{fav.content}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">― {fav.author}</span>
                  <button
                    onClick={() => toggleFavorite(fav)}
                    className="p-2 rounded-lg text-red-500 hover:bg-white/10 
                             transition-colors"
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyQuotes;