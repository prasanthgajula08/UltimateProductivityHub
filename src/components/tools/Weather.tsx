import React, { useState } from 'react';
import { Search, Cloud, CloudRain, Sun, Wind, Loader, CloudLightning, CloudSnow, CloudDrizzle, Thermometer } from 'lucide-react';
import { useQuery } from 'react-query';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const { data, isLoading, error, refetch } = useQuery<WeatherData>(
    ['weather', searchedCity],
    async () => {
      if (!searchedCity) return null;
      const API_KEY = 'b5e361d47dbc8d16d7f661a7d0f55d6f'; // Free API key, rate limited
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      return response.json();
    },
    {
      enabled: !!searchedCity,
      retry: false,
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchedCity(city.trim());
    }
  };

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="w-24 h-24 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="w-24 h-24 text-blue-500" />;
      case 'clouds':
        return <Cloud className="w-24 h-24 text-gray-400" />;
      case 'thunderstorm':
        return <CloudLightning className="w-24 h-24 text-purple-500" />;
      case 'snow':
        return <CloudSnow className="w-24 h-24 text-blue-300" />;
      case 'drizzle':
        return <CloudDrizzle className="w-24 h-24 text-blue-400" />;
      default:
        return <Cloud className="w-24 h-24 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                     placeholder-gray-500 text-white backdrop-blur-sm transition-all
                     hover:bg-white/[0.15] hover:border-white/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          Search
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      </form>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-400">
          City not found. Please try another city.
        </div>
      )}

      {data && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 
                         text-transparent bg-clip-text">
              {data.name}
            </h2>
            <p className="text-gray-400">{data.weather[0].description}</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {getWeatherIcon(data.weather[0].main)}
            <div className="text-6xl font-bold tracking-wider">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                {Math.round(data.main.temp)}°C
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Thermometer className="w-4 h-4" />
                <span>Feels Like</span>
              </div>
              <div className="text-2xl font-bold">
                {Math.round(data.main.feels_like)}°C
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <CloudRain className="w-4 h-4" />
                <span>Humidity</span>
              </div>
              <div className="text-2xl font-bold">{data.main.humidity}%</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Wind className="w-4 h-4" />
                <span>Wind Speed</span>
              </div>
              <div className="text-2xl font-bold">{Math.round(data.wind.speed)} m/s</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Cloud className="w-4 h-4" />
                <span>Pressure</span>
              </div>
              <div className="text-2xl font-bold">{data.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      )}

      {!searchedCity && !isLoading && !error && (
        <div className="text-center py-12 text-gray-400">
          Enter a city name to get the weather information
        </div>
      )}
    </div>
  );
};

export default Weather;