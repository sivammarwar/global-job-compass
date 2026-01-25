import { useAuth } from "@/hooks/useAuth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { CountriesManager } from "@/components/admin/CountriesManager";
import { JobsManager } from "@/components/admin/JobsManager";
import { ExamsManager } from "@/components/admin/ExamsManager";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AdminContent = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="countries" element={<CountriesManager />} />
      <Route path="jobs" element={<JobsManager />} />
      <Route path="exams" element={<ExamsManager />} />
    </Routes>
  );
};

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have admin privileges. Contact an administrator to get access.
          </p>
          <p className="text-sm text-muted-foreground">
            Logged in as: {user.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminContent />
    </AdminLayout>
  );
};

export default Admin;
