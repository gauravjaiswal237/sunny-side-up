import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface ForecastData {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

interface ForecastCardProps {
  data: ForecastData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun className="w-8 h-8 text-accent" />;
    case "clouds":
      return <Cloud className="w-8 h-8 text-muted-foreground" />;
    case "rain":
    case "drizzle":
      return <CloudRain className="w-8 h-8 text-primary" />;
    default:
      return <Cloud className="w-8 h-8 text-muted-foreground" />;
  }
};

export const ForecastCard = ({ data }: ForecastCardProps) => {
  const date = new Date(data.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  return (
    <Card className="bg-card/60 backdrop-blur-md border-border/50 shadow-weather-card hover:shadow-weather-lg transition-all hover:scale-110 hover:-translate-y-2 duration-500 group cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-5 md:p-6 text-center relative z-10">
        <p className="text-base md:text-lg font-bold text-foreground mb-4 tracking-wide uppercase">
          {dayName}
        </p>
        <div className="flex justify-center mb-4 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-500">
          {getWeatherIcon(data.weather[0].main)}
        </div>
        <p className="text-3xl md:text-4xl font-bold text-foreground mb-2 transition-colors group-hover:text-primary duration-300">
          {Math.round(data.main.temp)}°C
        </p>
        <p className="text-xs md:text-sm text-muted-foreground capitalize leading-snug">
          {data.weather[0].description}
        </p>
      </div>
    </Card>
  );
};
