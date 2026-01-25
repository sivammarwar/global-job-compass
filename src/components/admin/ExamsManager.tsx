import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface ExamListing {
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
  countries?: { country_name: string; flag_emoji: string | null };
}

export const ExamsManager = () => {
  const [exams, setExams] = useState<ExamListing[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamListing | null>(null);
  const [formData, setFormData] = useState({
    country_id: "",
    exam_name: "",
    conducting_body: "",
    exam_date: "",
    admit_card_link: "",
    result_link: "",
    syllabus_link: "",
    official_website: "",
    is_active: true,
  });
  const { toast } = useToast();

  const fetchData = async () => {
    const [examsRes, countriesRes] = await Promise.all([
      supabase
        .from("exam_listings")
        .select("*, countries(country_name, flag_emoji)")
        .order("created_at", { ascending: false }),
      supabase.from("countries").select("id, country_name, country_code").order("country_name"),
    ]);

    if (examsRes.error) {
      toast({ title: "Error", description: examsRes.error.message, variant: "destructive" });
    } else {
      setExams(examsRes.data || []);
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
      exam_date: formData.exam_date || null,
      admit_card_link: formData.admit_card_link || null,
      result_link: formData.result_link || null,
      syllabus_link: formData.syllabus_link || null,
      official_website: formData.official_website || null,
    };

    if (editingExam) {
      const { error } = await supabase
        .from("exam_listings")
        .update(payload)
        .eq("id", editingExam.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Exam updated successfully" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("exam_listings").insert(payload);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Exam added successfully" });
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleEdit = (exam: ExamListing) => {
    setEditingExam(exam);
    setFormData({
      country_id: exam.country_id,
      exam_name: exam.exam_name,
      conducting_body: exam.conducting_body,
      exam_date: exam.exam_date || "",
      admit_card_link: exam.admit_card_link || "",
      result_link: exam.result_link || "",
      syllabus_link: exam.syllabus_link || "",
      official_website: exam.official_website || "",
      is_active: exam.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam listing?")) return;

    const { error } = await supabase.from("exam_listings").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Exam deleted successfully" });
      fetchData();
    }
  };

  const resetForm = () => {
    setEditingExam(null);
    setFormData({
      country_id: "",
      exam_name: "",
      conducting_body: "",
      exam_date: "",
      admit_card_link: "",
      result_link: "",
      syllabus_link: "",
      official_website: "",
      is_active: true,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Exam Listings</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExam ? "Edit Exam" : "Add Exam"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="exam_name">Exam Name</Label>
                <Input
                  id="exam_name"
                  value={formData.exam_name}
                  onChange={(e) => setFormData({ ...formData, exam_name: e.target.value })}
                  placeholder="UPSC Civil Services Prelims 2026"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conducting_body">Conducting Body</Label>
                <Input
                  id="conducting_body"
                  value={formData.conducting_body}
                  onChange={(e) => setFormData({ ...formData, conducting_body: e.target.value })}
                  placeholder="Union Public Service Commission"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam_date">Exam Date</Label>
                <Input
                  id="exam_date"
                  value={formData.exam_date}
                  onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
                  placeholder="May 25, 2026 or May 2026"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admit_card_link">Admit Card Link</Label>
                  <Input
                    id="admit_card_link"
                    type="url"
                    value={formData.admit_card_link}
                    onChange={(e) => setFormData({ ...formData, admit_card_link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="result_link">Result Link</Label>
                  <Input
                    id="result_link"
                    type="url"
                    value={formData.result_link}
                    onChange={(e) => setFormData({ ...formData, result_link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="syllabus_link">Syllabus Link</Label>
                  <Input
                    id="syllabus_link"
                    type="url"
                    value={formData.syllabus_link}
                    onChange={(e) => setFormData({ ...formData, syllabus_link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="official_website">Official Website</Label>
                  <Input
                    id="official_website"
                    type="url"
                    value={formData.official_website}
                    onChange={(e) => setFormData({ ...formData, official_website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
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
                {editingExam ? "Update" : "Add"} Exam
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Exams ({exams.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : exams.length === 0 ? (
            <p className="text-muted-foreground">No exams added yet. Add countries first, then add exams.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Conducting Body</TableHead>
                    <TableHead>Exam Date</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        {exam.countries?.flag_emoji} {exam.countries?.country_name}
                      </TableCell>
                      <TableCell className="font-medium">{exam.exam_name}</TableCell>
                      <TableCell>{exam.conducting_body}</TableCell>
                      <TableCell>{exam.exam_date || "TBA"}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {exam.admit_card_link && (
                            <a href={exam.admit_card_link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">AC</a>
                          )}
                          {exam.result_link && (
                            <a href={exam.result_link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">R</a>
                          )}
                          {exam.syllabus_link && (
                            <a href={exam.syllabus_link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">S</a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${exam.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {exam.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {exam.official_website && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={exam.official_website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(exam)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(exam.id)}>
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
