import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Briefcase, FileText, TrendingUp } from "lucide-react";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    countries: 0,
    jobs: 0,
    exams: 0,
    activeJobs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [countriesRes, jobsRes, examsRes, activeJobsRes] = await Promise.all([
        supabase.from("countries").select("id", { count: "exact", head: true }),
        supabase.from("job_listings").select("id", { count: "exact", head: true }),
        supabase.from("exam_listings").select("id", { count: "exact", head: true }),
        supabase.from("job_listings").select("id", { count: "exact", head: true }).eq("is_active", true),
      ]);

      setStats({
        countries: countriesRes.count || 0,
        jobs: jobsRes.count || 0,
        exams: examsRes.count || 0,
        activeJobs: activeJobsRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Countries",
      value: stats.countries,
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Job Listings",
      value: stats.jobs,
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Exam Listings",
      value: stats.exams,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>• Go to <strong>Countries</strong> to add/manage countries</p>
          <p>• Go to <strong>Job Listings</strong> to add government jobs</p>
          <p>• Go to <strong>Exam Listings</strong> to add exam information</p>
        </CardContent>
      </Card>
    </div>
  );
};
