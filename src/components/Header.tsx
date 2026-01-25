import { Globe, ChevronDown } from "lucide-react";
import { Country } from "@/data/countries";

interface HeaderProps {
  country: Country;
  onChangeCountry: () => void;
}

export const Header = ({ country, onChangeCountry }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="portal-container py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-foreground text-sm sm:text-base">
                Global Government Jobs
              </h1>
            </div>
          </div>

          {/* Country Selector */}
          <button
            onClick={onChangeCountry}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <span className="text-xl sm:text-2xl">{country.flag}</span>
            <span className="font-medium text-foreground text-sm sm:text-base">
              {country.name}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
