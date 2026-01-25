import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Globe, Loader2 } from "lucide-react";
import { useCountries, DbCountry } from "@/hooks/useData";

interface CountrySelectorProps {
  onSelectCountry: (country: DbCountry) => void;
}

export const CountrySelector = ({ onSelectCountry }: CountrySelectorProps) => {
  const { countries, loading } = useCountries();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<DbCountry | null>(null);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    const query = searchQuery.toLowerCase();
    return countries.filter(
      (country) =>
        country.country_name.toLowerCase().includes(query) ||
        country.country_code.toLowerCase().includes(query)
    );
  }, [searchQuery, countries]);

  const handleSelect = (country: DbCountry) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleProceed = () => {
    if (selectedCountry) {
      onSelectCountry(selectedCountry);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      {/* Logo/Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-xl flex items-center justify-center">
            <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
          Global Government Jobs
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Find government job opportunities and exam information from around the world
        </p>
      </div>

      {/* Country Selection Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm animate-fade-in">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 text-center">
          Select Your Country
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading countries...</span>
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No countries available yet. Admin needs to add countries first.
          </div>
        ) : (
          <>
            {/* Search/Dropdown */}
            <div className="relative mb-6">
              <div
                className="country-selector flex items-center gap-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                {selectedCountry ? (
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-2xl">{selectedCountry.flag_emoji || "🏳️"}</span>
                    <span className="text-foreground font-medium">
                      {selectedCountry.country_name}
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsOpen(true);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                    }}
                  />
                )}
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {selectedCountry && (
                    <div className="p-2 border-b border-border">
                      <input
                        type="text"
                        placeholder="Search country..."
                        className="w-full px-3 py-2 bg-secondary rounded-lg outline-none text-foreground placeholder:text-muted-foreground text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  )}
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.id}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                        onClick={() => handleSelect(country)}
                      >
                        <span className="text-2xl">{country.flag_emoji || "🏳️"}</span>
                        <span className="text-foreground">{country.country_name}</span>
                        <span className="text-muted-foreground text-sm ml-auto">
                          {country.country_code}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-muted-foreground">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Proceed Button */}
            <button
              className={`w-full py-3 rounded-xl font-semibold text-base transition-all ${
                selectedCountry
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
              onClick={handleProceed}
              disabled={!selectedCountry}
            >
              Proceed
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-muted-foreground text-xs sm:text-sm">
        <p>© 2026 Global Government Jobs Portal</p>
        <p className="mt-1">
          Not affiliated with any government organization
        </p>
        <Link to="/admin" className="text-primary hover:underline mt-2 inline-block">
          Admin Login
        </Link>
      </footer>
    </div>
  );
};
