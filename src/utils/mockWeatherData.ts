// Mock weather data for demonstration
export const mockWeatherData = {
  name: "London",
  main: {
    temp: 15,
    feels_like: 13,
    humidity: 72,
  },
  weather: [
    {
      main: "Clouds",
      description: "scattered clouds",
    },
  ],
  wind: {
    speed: 4.5,
  },
};

export const mockForecastData = [
  {
    dt: Date.now() / 1000,
    main: { temp: 15 },
    weather: [{ main: "Clouds", description: "scattered clouds" }],
  },
  {
    dt: Date.now() / 1000 + 86400,
    main: { temp: 18 },
    weather: [{ main: "Clear", description: "clear sky" }],
  },
  {
    dt: Date.now() / 1000 + 172800,
    main: { temp: 16 },
    weather: [{ main: "Rain", description: "light rain" }],
  },
  {
    dt: Date.now() / 1000 + 259200,
    main: { temp: 14 },
    weather: [{ main: "Clouds", description: "overcast clouds" }],
  },
  {
    dt: Date.now() / 1000 + 345600,
    main: { temp: 17 },
    weather: [{ main: "Clear", description: "sunny" }],
  },
];

// City-specific weather data for more realistic variations
const cityWeatherMap: Record<string, { baseTemp: number; humidity: number; condition: string }> = {
  "london": { baseTemp: 12, humidity: 75, condition: "Clouds" },
  "new york": { baseTemp: 18, humidity: 65, condition: "Clear" },
  "tokyo": { baseTemp: 20, humidity: 70, condition: "Clear" },
  "paris": { baseTemp: 15, humidity: 68, condition: "Clouds" },
  "sydney": { baseTemp: 22, humidity: 60, condition: "Clear" },
  "dubai": { baseTemp: 35, humidity: 45, condition: "Clear" },
  "mumbai": { baseTemp: 28, humidity: 80, condition: "Clouds" },
  "delhi": { baseTemp: 25, humidity: 55, condition: "Clear" },
  "bangalore": { baseTemp: 24, humidity: 65, condition: "Clouds" },
  "kanpur": { baseTemp: 26, humidity: 60, condition: "Clear" },
  "moscow": { baseTemp: 5, humidity: 70, condition: "Snow" },
  "singapore": { baseTemp: 30, humidity: 85, condition: "Rain" },
};

export const getCityMockData = (cityName: string) => {
  const cityKey = cityName.toLowerCase();
  const cityData = cityWeatherMap[cityKey];
  
  if (cityData) {
    return {
      ...mockWeatherData,
      name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
      main: {
        temp: cityData.baseTemp + Math.floor(Math.random() * 5) - 2,
        feels_like: cityData.baseTemp + Math.floor(Math.random() * 3) - 3,
        humidity: cityData.humidity + Math.floor(Math.random() * 10) - 5,
      },
      weather: [
        {
          main: cityData.condition,
          description: cityData.condition === "Clear" ? "clear sky" : 
                      cityData.condition === "Clouds" ? "scattered clouds" :
                      cityData.condition === "Rain" ? "light rain" : "light snow",
        },
      ],
    };
  }
  
  // Default random data for unlisted cities
  return {
    ...mockWeatherData,
    name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
    main: {
      temp: Math.floor(Math.random() * 20) + 10,
      feels_like: Math.floor(Math.random() * 18) + 8,
      humidity: Math.floor(Math.random() * 40) + 50,
    },
  };
};
