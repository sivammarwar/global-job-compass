import { ExternalLink, Calendar, Building2 } from "lucide-react";
import { DbJob } from "@/hooks/useData";

interface JobCardProps {
  job: DbJob;
}

export const JobCard = ({ job }: JobCardProps) => {
  const formatDeadline = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="job-card animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            {job.category && (
              <span className="inline-block px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded">
                {job.category}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 line-clamp-2">
            {job.job_title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{job.department_name}</span>
            </div>
            {job.application_deadline && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Deadline: {formatDeadline(job.application_deadline)}</span>
              </div>
            )}
          </div>
          {job.job_description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {job.job_description}
            </p>
          )}
        </div>
        <a
          href={job.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-apply flex-shrink-0 self-start sm:self-center"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
