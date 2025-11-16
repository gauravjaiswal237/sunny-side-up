import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { mockWeatherData, mockForecastData, getCityMockData } from "@/utils/mockWeatherData";

const Index = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [forecastData, setForecastData] = useState(mockForecastData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setWeatherData(getCityMockData(city));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [city]);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    toast({
      title: "Searching...",
      description: `Looking up weather for ${newCity}`,
    });
  };

  const handleLocationSearch = () => {
    toast({
      title: "Demo Mode",
      description: "Using mock data. Get a free API key from OpenWeatherMap to use real data!",
    });
    setCity("Your Location");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 transition-all duration-1000">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-3 md:mb-4 tracking-tight">
            Weather Forecast
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            5-Day weather predictions for any city worldwide
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-accent/10 rounded-full">
            <p className="text-sm text-muted-foreground">
              🌟 Demo Mode - Using sample data
            </p>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        ) : (
          <>
            {weatherData && (
              <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
                <WeatherCard data={weatherData} />
              </div>
            )}

            {forecastData && forecastData.length > 0 && (
              <div className="max-w-6xl mx-auto animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    5-Day Forecast
                  </h2>
                  <p className="text-muted-foreground">Extended weather predictions</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                  {forecastData.map((forecast: any, index: number) => (
                    <div 
                      key={forecast.dt} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ForecastCard data={forecast} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
      </div>
    </div>
  );
};

export default Index;
