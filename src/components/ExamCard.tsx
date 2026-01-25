import { ExternalLink, Calendar, Building2, FileText, Award, BookOpen } from "lucide-react";
import { Exam } from "@/data/sampleData";

interface ExamCardProps {
  exam: Exam;
}

export const ExamCard = ({ exam }: ExamCardProps) => {
  return (
    <div className="exam-card animate-fade-in">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">
            {exam.name}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{exam.conductingBody}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{exam.examDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {exam.admitCardLink ? (
            <a
              href={exam.admitCardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-admit"
            >
              <FileText className="w-3.5 h-3.5" />
              Admit Card
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground font-medium rounded-md text-xs sm:text-sm cursor-not-allowed">
              <FileText className="w-3.5 h-3.5" />
              Admit Card
            </span>
          )}

          {exam.resultLink ? (
            <a
              href={exam.resultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-result"
            >
              <Award className="w-3.5 h-3.5" />
              Result
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground font-medium rounded-md text-xs sm:text-sm cursor-not-allowed">
              <Award className="w-3.5 h-3.5" />
              Result
            </span>
          )}

          {exam.syllabusLink ? (
            <a
              href={exam.syllabusLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-syllabus"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Syllabus
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground font-medium rounded-md text-xs sm:text-sm cursor-not-allowed">
              <BookOpen className="w-3.5 h-3.5" />
              Syllabus
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
