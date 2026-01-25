import { Briefcase, AlertCircle, Loader2 } from "lucide-react";
import { JobCard } from "./JobCard";
import { DbJob } from "@/hooks/useData";

interface JobsSectionProps {
  jobs: DbJob[];
  countryName: string;
  loading?: boolean;
}

export const JobsSection = ({ jobs, countryName, loading }: JobsSectionProps) => {
  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Government Jobs
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="space-y-3 sm:space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {jobs.length >= 3 && (
            <button className="view-more-btn mt-4">
              View More Jobs
            </button>
          )}
        </>
      ) : (
        <div className="bg-secondary/50 rounded-xl p-6 sm:p-8 text-center">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-1">
            No Jobs Available
          </h3>
          <p className="text-sm text-muted-foreground">
            Government job listings for {countryName} will be added soon.
          </p>
        </div>
      )}
    </section>
  );
};
