import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun className="w-24 h-24 text-accent" />;
    case "clouds":
      return <Cloud className="w-24 h-24 text-muted-foreground" />;
    case "rain":
    case "drizzle":
      return <CloudRain className="w-24 h-24 text-primary" />;
    default:
      return <Cloud className="w-24 h-24 text-muted-foreground" />;
  }
};

const getWeatherGradient = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return "bg-gradient-sunny";
    case "clouds":
      return "bg-gradient-cloudy";
    case "rain":
    case "drizzle":
      return "bg-gradient-rainy";
    default:
      return "bg-gradient-clear";
  }
};

export const WeatherCard = ({ data }: WeatherCardProps) => {
  const weatherCondition = data.weather[0].main;
  const gradient = getWeatherGradient(weatherCondition);

  return (
    <Card className={`${gradient} border-0 shadow-weather-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl duration-500 group`}>
      <div className="p-6 md:p-8 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight animate-fade-in">
                {data.name}
              </h2>
              <p className="text-lg md:text-xl opacity-90 capitalize animate-fade-in" style={{ animationDelay: '100ms' }}>
                {data.weather[0].description}
              </p>
            </div>
            <div className="flex items-center transition-transform group-hover:scale-110 duration-500">
              {getWeatherIcon(weatherCondition)}
            </div>
          </div>
          
          <div className="mb-8 md:mb-10 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="text-6xl md:text-8xl font-bold mb-2 leading-none">
              {Math.round(data.main.temp)}°C
            </div>
            <p className="text-base md:text-lg opacity-90">
              Feels like {Math.round(data.main.feels_like)}°C
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-xl p-4 md:p-5 transition-all hover:bg-white/25 hover:scale-105 duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Droplets className="w-6 h-6 md:w-7 md:h-7" />
              <div>
                <p className="text-xs md:text-sm opacity-80 mb-1">Humidity</p>
                <p className="text-xl md:text-2xl font-bold">{data.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-xl p-4 md:p-5 transition-all hover:bg-white/25 hover:scale-105 duration-300 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Wind className="w-6 h-6 md:w-7 md:h-7" />
              <div>
                <p className="text-xs md:text-sm opacity-80 mb-1">Wind Speed</p>
                <p className="text-xl md:text-2xl font-bold">{Math.round(data.wind.speed)} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
