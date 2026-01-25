import { useState } from "react";
import { CountrySelector } from "@/components/CountrySelector";
import { Dashboard } from "@/components/Dashboard";
import { Country } from "@/data/countries";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleChangeCountry = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      {selectedCountry ? (
        <Dashboard
          country={selectedCountry}
          onChangeCountry={handleChangeCountry}
        />
      ) : (
        <CountrySelector onSelectCountry={handleSelectCountry} />
      )}
    </>
  );
};

export default Index;
