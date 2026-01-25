import { ExternalLink, Calendar, Building2 } from "lucide-react";
import { Job } from "@/data/sampleData";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="job-card animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <span className="inline-block px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded">
              {job.category}
            </span>
          </div>
          <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 line-clamp-2">
            {job.title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{job.department}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>Deadline: {job.deadline}</span>
            </div>
          </div>
        </div>
        <a
          href={job.link}
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
