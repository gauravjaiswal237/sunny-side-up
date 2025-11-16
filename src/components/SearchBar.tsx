import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Check } from "lucide-react";
import { popularCities } from "@/utils/cities";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
}

export const SearchBar = ({ onSearch, onLocationSearch }: SearchBarProps) => {
  const [city, setCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCities = city.trim()
    ? popularCities.filter((c) =>
        c.toLowerCase().includes(city.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
      setIsOpen(false);
    }
  };

  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setCity("");
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredCities.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectCity(filteredCities[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-in relative" style={{ animationDelay: '200ms' }} ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 md:gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => city.trim() && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="pl-10 md:pl-12 h-12 md:h-14 text-base md:text-lg bg-card/80 backdrop-blur-md border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl shadow-sm hover:shadow-md"
            autoComplete="off"
          />
          
          {/* Dropdown */}
          {isOpen && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
              <div className="max-h-64 overflow-y-auto">
                {filteredCities.map((cityName, index) => (
                  <button
                    key={cityName}
                    type="button"
                    onClick={() => handleSelectCity(cityName)}
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors flex items-center justify-between group",
                      selectedIndex === index && "bg-primary/10"
                    )}
                  >
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {cityName}
                    </span>
                    {selectedIndex === index && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          size="lg" 
          className="h-12 md:h-14 px-4 md:px-8 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl font-semibold"
        >
          <span className="hidden md:inline">Search</span>
          <Search className="w-5 h-5 md:hidden" />
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={onLocationSearch}
          className="h-12 md:h-14 px-3 md:px-5 bg-card/80 backdrop-blur-md border-border/50 hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 rounded-xl shadow-sm"
        >
          <MapPin className="w-5 h-5" />
        </Button>
        </div>
      </form>
    </div>
  );
};
