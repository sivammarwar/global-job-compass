import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

interface Country {
  id: string;
  country_name: string;
  country_code: string;
}

interface JobListing {
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
  countries?: { country_name: string; flag_emoji: string | null };
}

export const JobsManager = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [formData, setFormData] = useState({
    country_id: "",
    job_title: "",
    department_name: "",
    application_deadline: "",
    official_link: "",
    job_description: "",
    qualifications: "",
    category: "General",
    is_active: true,
  });
  const { toast } = useToast();

  const fetchData = async () => {
    const [jobsRes, countriesRes] = await Promise.all([
      supabase
        .from("job_listings")
        .select("*, countries(country_name, flag_emoji)")
        .order("created_at", { ascending: false }),
      supabase.from("countries").select("id, country_name, country_code").order("country_name"),
    ]);

    if (jobsRes.error) {
      toast({ title: "Error", description: jobsRes.error.message, variant: "destructive" });
    } else {
      setJobs(jobsRes.data || []);
    }

    if (countriesRes.data) {
      setCountries(countriesRes.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      application_deadline: formData.application_deadline || null,
      job_description: formData.job_description || null,
      qualifications: formData.qualifications || null,
    };

    if (editingJob) {
      const { error } = await supabase
        .from("job_listings")
        .update(payload)
        .eq("id", editingJob.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Job updated successfully" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("job_listings").insert(payload);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Job added successfully" });
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleEdit = (job: JobListing) => {
    setEditingJob(job);
    setFormData({
      country_id: job.country_id,
      job_title: job.job_title,
      department_name: job.department_name,
      application_deadline: job.application_deadline || "",
      official_link: job.official_link,
      job_description: job.job_description || "",
      qualifications: job.qualifications || "",
      category: job.category || "General",
      is_active: job.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;

    const { error } = await supabase.from("job_listings").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Job deleted successfully" });
      fetchData();
    }
  };

  const resetForm = () => {
    setEditingJob(null);
    setFormData({
      country_id: "",
      job_title: "",
      department_name: "",
      application_deadline: "",
      official_link: "",
      job_description: "",
      qualifications: "",
      category: "General",
      is_active: true,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Job Listings</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job" : "Add Job"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country_id">Country</Label>
                  <Select
                    value={formData.country_id}
                    onValueChange={(value) => setFormData({ ...formData, country_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.country_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Federal, State, Banking..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  placeholder="Civil Services Examination"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department_name">Department</Label>
                <Input
                  id="department_name"
                  value={formData.department_name}
                  onChange={(e) => setFormData({ ...formData, department_name: e.target.value })}
                  placeholder="Union Public Service Commission"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input
                    id="application_deadline"
                    type="date"
                    value={formData.application_deadline}
                    onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="official_link">Official Link</Label>
                  <Input
                    id="official_link"
                    type="url"
                    value={formData.official_link}
                    onChange={(e) => setFormData({ ...formData, official_link: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_description">Description (optional)</Label>
                <Textarea
                  id="job_description"
                  value={formData.job_description}
                  onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
                  placeholder="Brief description of the job..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications (optional)</Label>
                <Textarea
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  placeholder="Required qualifications..."
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingJob ? "Update" : "Add"} Job
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Jobs ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="text-muted-foreground">No jobs added yet. Add countries first, then add jobs.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        {job.countries?.flag_emoji} {job.countries?.country_name}
                      </TableCell>
                      <TableCell className="font-medium">{job.job_title}</TableCell>
                      <TableCell>{job.department_name}</TableCell>
                      <TableCell>{job.application_deadline || "N/A"}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${job.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {job.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={job.official_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
