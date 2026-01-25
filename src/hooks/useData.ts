import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DbCountry {
  id: string;
  country_name: string;
  country_code: string;
  flag_emoji: string | null;
  is_active: boolean;
}

export interface DbJob {
  id: string;
  country_id: string;
  job_title: string;
  department_name: string;
  application_deadline: string | null;
  official_link: string;
  job_description: string | null;
  qualifications: string | null;
  category: string | null;
  is_active: boolean;
}

export interface DbExam {
  id: string;
  country_id: string;
  exam_name: string;
  conducting_body: string;
  exam_date: string | null;
  admit_card_link: string | null;
  result_link: string | null;
  syllabus_link: string | null;
  official_website: string | null;
  is_active: boolean;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<DbCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .eq("is_active", true)
        .order("country_name");

      if (!error && data) {
        setCountries(data);
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};

export const useJobsByCountry = (countryId: string | null) => {
  const [jobs, setJobs] = useState<DbJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryId) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .eq("country_id", countryId)
        .eq("is_active", true)
        .order("posted_date", { ascending: false });

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [countryId]);

  return { jobs, loading };
};

export const useExamsByCountry = (countryId: string | null) => {
  const [exams, setExams] = useState<DbExam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryId) {
      setExams([]);
      setLoading(false);
      return;
    }

    const fetchExams = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("exam_listings")
        .select("*")
        .eq("country_id", countryId)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setExams(data);
      }
      setLoading(false);
    };

    fetchExams();
  }, [countryId]);

  return { exams, loading };
};
