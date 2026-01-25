import { useState } from "react";
import { CountrySelector } from "@/components/CountrySelector";
import { Dashboard } from "@/components/Dashboard";
import { DbCountry } from "@/hooks/useData";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<DbCountry | null>(null);

  const handleSelectCountry = (country: DbCountry) => {
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
