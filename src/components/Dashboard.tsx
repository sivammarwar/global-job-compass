import { Header } from "./Header";
import { JobsSection } from "./JobsSection";
import { ExamsSection } from "./ExamsSection";
import { Country } from "@/data/countries";
import { getJobsForCountry, getExamsForCountry } from "@/data/sampleData";

interface DashboardProps {
  country: Country;
  onChangeCountry: () => void;
}

export const Dashboard = ({ country, onChangeCountry }: DashboardProps) => {
  const jobs = getJobsForCountry(country.code);
  const exams = getExamsForCountry(country.code);

  return (
    <div className="min-h-screen bg-background">
      <Header country={country} onChangeCountry={onChangeCountry} />

      <main className="portal-container py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="bg-accent/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{country.flag}</span>
            <div>
              <h2 className="font-bold text-foreground text-lg sm:text-xl">
                {country.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing government opportunities for {country.name}
              </p>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <JobsSection jobs={jobs} countryName={country.name} />

        {/* Exams Section */}
        <ExamsSection exams={exams} countryName={country.name} />

        {/* Disclaimer */}
        <div className="bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> This portal is not affiliated with any
            government organization. Links redirect to official government
            websites.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="portal-container text-center text-muted-foreground text-sm">
          <p>© 2026 Global Government Jobs Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
