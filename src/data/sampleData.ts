// Sample data for jobs and exams - In production, this will come from the database

export interface Job {
  id: string;
  title: string;
  department: string;
  deadline: string;
  link: string;
  category: string;
}

export interface Exam {
  id: string;
  name: string;
  conductingBody: string;
  examDate: string;
  admitCardLink: string | null;
  resultLink: string | null;
  syllabusLink: string | null;
}

// Sample jobs by country
export const sampleJobs: Record<string, Job[]> = {
  US: [
    {
      id: "us-1",
      title: "Federal Government Accountant",
      department: "Department of Treasury",
      deadline: "March 15, 2026",
      link: "https://www.usajobs.gov",
      category: "Federal",
    },
    {
      id: "us-2",
      title: "Park Ranger",
      department: "National Park Service",
      deadline: "April 20, 2026",
      link: "https://www.usajobs.gov",
      category: "Federal",
    },
    {
      id: "us-3",
      title: "Immigration Officer",
      department: "Department of Homeland Security",
      deadline: "May 10, 2026",
      link: "https://www.usajobs.gov",
      category: "Federal",
    },
  ],
  GB: [
    {
      id: "gb-1",
      title: "Civil Service Fast Stream",
      department: "Cabinet Office",
      deadline: "February 28, 2026",
      link: "https://www.gov.uk/government/organisations/civil-service-fast-stream",
      category: "Central",
    },
    {
      id: "gb-2",
      title: "NHS Administrator",
      department: "National Health Service",
      deadline: "March 30, 2026",
      link: "https://www.jobs.nhs.uk",
      category: "Health",
    },
  ],
  IN: [
    {
      id: "in-1",
      title: "Civil Services Examination (IAS/IPS)",
      department: "Union Public Service Commission",
      deadline: "March 15, 2026",
      link: "https://www.upsc.gov.in",
      category: "Central",
    },
    {
      id: "in-2",
      title: "Staff Selection Commission CGL",
      department: "SSC",
      deadline: "April 30, 2026",
      link: "https://www.ssc.nic.in",
      category: "Central",
    },
    {
      id: "in-3",
      title: "Bank Probationary Officer",
      department: "IBPS",
      deadline: "May 20, 2026",
      link: "https://www.ibps.in",
      category: "Banking",
    },
    {
      id: "in-4",
      title: "Railway Recruitment Board NTPC",
      department: "Indian Railways",
      deadline: "June 15, 2026",
      link: "https://www.rrbcdg.gov.in",
      category: "Railways",
    },
  ],
  CA: [
    {
      id: "ca-1",
      title: "Federal Public Service Officer",
      department: "Public Service Commission",
      deadline: "April 15, 2026",
      link: "https://www.canada.ca/en/public-service-commission.html",
      category: "Federal",
    },
    {
      id: "ca-2",
      title: "Immigration Officer",
      department: "IRCC",
      deadline: "May 30, 2026",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
      category: "Federal",
    },
  ],
  AU: [
    {
      id: "au-1",
      title: "Australian Public Service Graduate",
      department: "APS Graduate Program",
      deadline: "March 31, 2026",
      link: "https://www.apsc.gov.au",
      category: "Federal",
    },
    {
      id: "au-2",
      title: "Border Force Officer",
      department: "Australian Border Force",
      deadline: "April 20, 2026",
      link: "https://www.abf.gov.au",
      category: "Federal",
    },
  ],
};

// Sample exams by country
export const sampleExams: Record<string, Exam[]> = {
  US: [
    {
      id: "us-ex-1",
      name: "Federal Employment Aptitude Test",
      conductingBody: "Office of Personnel Management",
      examDate: "June 15, 2026",
      admitCardLink: "https://www.usajobs.gov",
      resultLink: "https://www.usajobs.gov",
      syllabusLink: "https://www.usajobs.gov",
    },
    {
      id: "us-ex-2",
      name: "Postal Service Exam 473",
      conductingBody: "USPS",
      examDate: "July 20, 2026",
      admitCardLink: "https://about.usps.com/careers",
      resultLink: null,
      syllabusLink: "https://about.usps.com/careers",
    },
  ],
  GB: [
    {
      id: "gb-ex-1",
      name: "Civil Service Fast Stream Assessment",
      conductingBody: "Cabinet Office",
      examDate: "May 10, 2026",
      admitCardLink: "https://www.gov.uk/civil-service-fast-stream",
      resultLink: "https://www.gov.uk/civil-service-fast-stream",
      syllabusLink: "https://www.gov.uk/civil-service-fast-stream",
    },
  ],
  IN: [
    {
      id: "in-ex-1",
      name: "UPSC Civil Services Prelims 2026",
      conductingBody: "Union Public Service Commission",
      examDate: "May 25, 2026",
      admitCardLink: "https://www.upsc.gov.in",
      resultLink: "https://www.upsc.gov.in",
      syllabusLink: "https://www.upsc.gov.in",
    },
    {
      id: "in-ex-2",
      name: "SSC CGL 2026",
      conductingBody: "Staff Selection Commission",
      examDate: "June 15-30, 2026",
      admitCardLink: "https://www.ssc.nic.in",
      resultLink: null,
      syllabusLink: "https://www.ssc.nic.in",
    },
    {
      id: "in-ex-3",
      name: "IBPS PO 2026",
      conductingBody: "IBPS",
      examDate: "October 2026",
      admitCardLink: null,
      resultLink: null,
      syllabusLink: "https://www.ibps.in",
    },
    {
      id: "in-ex-4",
      name: "NEET PG 2026",
      conductingBody: "National Board of Examinations",
      examDate: "July 5, 2026",
      admitCardLink: "https://www.nbe.edu.in",
      resultLink: null,
      syllabusLink: "https://www.nbe.edu.in",
    },
  ],
  CA: [
    {
      id: "ca-ex-1",
      name: "Public Service Entrance Exam",
      conductingBody: "PSC Canada",
      examDate: "April 2026",
      admitCardLink: "https://www.canada.ca/psc",
      resultLink: null,
      syllabusLink: "https://www.canada.ca/psc",
    },
  ],
  AU: [
    {
      id: "au-ex-1",
      name: "APS Graduate Program Assessment",
      conductingBody: "APSC",
      examDate: "May 2026",
      admitCardLink: "https://www.apsc.gov.au",
      resultLink: "https://www.apsc.gov.au",
      syllabusLink: "https://www.apsc.gov.au",
    },
  ],
};

// Get jobs for a country, return empty array if no data
export const getJobsForCountry = (countryCode: string): Job[] => {
  return sampleJobs[countryCode] || [];
};

// Get exams for a country, return empty array if no data
export const getExamsForCountry = (countryCode: string): Exam[] => {
  return sampleExams[countryCode] || [];
};
