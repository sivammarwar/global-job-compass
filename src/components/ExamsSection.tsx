import { GraduationCap, AlertCircle } from "lucide-react";
import { ExamCard } from "./ExamCard";
import { Exam } from "@/data/sampleData";

interface ExamsSectionProps {
  exams: Exam[];
  countryName: string;
}

export const ExamsSection = ({ exams, countryName }: ExamsSectionProps) => {
  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Government Exams
        </h2>
      </div>

      {exams.length > 0 ? (
        <>
          <div className="space-y-3 sm:space-y-4">
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          {exams.length >= 3 && (
            <button className="view-more-btn mt-4">
              View More Exams
            </button>
          )}
        </>
      ) : (
        <div className="bg-secondary/50 rounded-xl p-6 sm:p-8 text-center">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-1">
            No Exams Available
          </h3>
          <p className="text-sm text-muted-foreground">
            Government exam listings for {countryName} will be added soon.
          </p>
        </div>
      )}
    </section>
  );
};
