import { useState, useEffect } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, UserPlus, Shield, LogOut, RefreshCw, BarChart3, Key, FileDown, Clock, Eye, Download, FileText, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { WorkshopReminders } from "@/components/WorkshopReminders";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VerifiedMember {
  id: number;
  fullName: string;
  email: string;
  status: "active" | "disabled";
  createdAt: string;
}

interface RegisteredUser {
  id: number;
  email: string;
  status: "active" | "disabled";
  createdAt: string;
  lastSignedIn: string | null;
}

interface SharedSubmission {
  id: number;
  userEmail: string;
  workshopTitle: string;
  workshopDate: string;
  fileName: string;
  sharedAt: string;
  status: string;
}

export default function AdminDashboard() {
  const { admin, token, logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [verifiedMembers, setVerifiedMembers] = useState<VerifiedMember[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [sharedSubmissions, setSharedSubmissions] = useState<SharedSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDownloading, setIsDownloading] = useState<number | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<SharedSubmission | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewPdfData, setPreviewPdfData] = useState<string | null>(null);

  // Daily digest state
  const [isSendingDigest, setIsSendingDigest] = useState(false);

  const fetchData = async () => {
    try {
      const [membersRes, usersRes, sharedRes] = await Promise.all([
        fetch("/api/admin/verified-members", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/shared-homework", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (membersRes.ok) {
        const membersData = await membersRes.json();
        setVerifiedMembers(membersData.members);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setRegisteredUsers(usersData.users);
      }

      if (sharedRes.ok) {
        const sharedData = await sharedRes.json();
        setSharedSubmissions(sharedData.submissions);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSendDigest = async () => {
    setIsSendingDigest(true);
    try {
      const response = await fetch("/api/admin/send-digest", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error || "Versturen mislukt");
      }
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    } finally {
      setIsSendingDigest(false);
    }
  };

  const handleDownload = async (submissionId: number, fileName: string) => {
    try {
      setIsDownloading(submissionId);
      const response = await fetch(`/api/admin/shared-homework/${submissionId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Download failed");

      const data = await response.json();
      
      const link = document.createElement('a');
      link.href = data.pdfData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Download gestart");
    } catch (error) {
      toast.error("Download mislukt");
    } finally {
      setIsDownloading(null);
    }
  };

  const handlePreview = async (submission: SharedSubmission) => {
    setSelectedSubmission(submission);
    setIsPreviewLoading(true);
    try {
      const response = await fetch(`/api/admin/shared-homework/${submission.id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load preview");
      const data = await response.json();
      setPreviewPdfData(data.pdfData);
    } catch (error) {
      toast.error("Kon preview niet laden");
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingMember(true);

    try {
      const response = await fetch("/api/admin/verified-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: newMemberName,
          email: newMemberEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to add member");
        return;
      }

      toast.success("Member added successfully!");
      setNewMemberName("");
      setNewMemberEmail("");
      setShowAddDialog(false);
      fetchData();
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleToggleMemberStatus = async (memberId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "disabled" : "active";

    try {
      const response = await fetch(`/api/admin/verified-members/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        toast.error("Failed to update status");
        return;
      }

      toast.success(`Member ${newStatus === "active" ? "enabled" : "disabled"}`);
      fetchData();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleToggleUserStatus = async (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "disabled" : "active";

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        toast.error("Failed to update status");
        return;
      }

      toast.success(`User ${newStatus === "active" ? "enabled" : "disabled"}`);
      fetchData();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Failed to change password");
        return;
      }
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePasswordDialog(false);
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <WorkshopReminders />
            <Button variant="outline" size="sm" onClick={() => setLocation('/admin/shared-answers')}>
              <FileText className="h-4 w-4 mr-2" />
              Gedeelde antwoorden
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLocation('/admin/usage')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Usage Stats
            </Button>
            <Dialog open={showChangePasswordDialog} onOpenChange={setShowChangePasswordDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Admin Password</DialogTitle>
                  <DialogDescription>Enter your current password and choose a new one</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required disabled={isChangingPassword} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required disabled={isChangingPassword} minLength={8} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isChangingPassword} minLength={8} />
                  </div>
                  <Button type="submit" className="w-full" disabled={isChangingPassword}>
                    {isChangingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Change Password"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Verified Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{verifiedMembers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Registered Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{registeredUsers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Gedeeld huiswerk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sharedSubmissions.length}</div>
            </CardContent>
          </Card>
          {/* Daily Digest Card */}
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Dagelijkse samenvatting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">Elke dag om 20:00 per email</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSendDigest}
                disabled={isSendingDigest}
                className="w-full"
              >
                {isSendingDigest ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Versturen...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Nu versturen
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Books Download Section */}
        <Card className="border-emerald-200 shadow-md">
          <CardHeader className="bg-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <FileDown className="h-5 w-5 text-emerald-600" />
              Beschikbare boeken
            </CardTitle>
            <CardDescription>Download de ondersteunende materialen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 px-6 flex flex-col items-start gap-2 justify-start"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/books/DeMaskermakerdeel1.pdf';
                  link.download = 'De Maskermaker - Deel 1.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">De maskermaker - deel 1</span>
                </div>
                <span className="text-xs text-muted-foreground">PDF Document</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 px-6 flex flex-col items-start gap-2 justify-start"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/books/Vanwondnaarwonderv82-2-26.pdf';
                  link.download = 'Van Wond naar Wonder.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">Van wond naar wonder</span>
                </div>
                <span className="text-xs text-muted-foreground">PDF Document</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shared Homework Section */}
        <Card className="border-primary/20 shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ingeleverd huiswerk</CardTitle>
                <CardDescription>Bekijk en download huiswerk dat door cliënten is gedeeld</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={fetchData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Vernieuwen
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {sharedSubmissions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Nog geen gedeeld huiswerk ontvangen.</p>
              ) : (
                <div className="grid gap-4">
                  {sharedSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:border-primary/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-lg">{submission.userEmail}</p>
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            {submission.workshopTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(submission.sharedAt).toLocaleString('nl-NL')}
                          </span>
                          <span>{submission.workshopDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="gap-2"
                              onClick={() => handlePreview(submission)}
                            >
                              <Eye className="h-4 w-4" />
                              Bekijk
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] w-[1200px] h-[95vh] flex flex-col p-0 overflow-hidden">
                            <div className="p-6 border-b bg-white">
                              <DialogHeader>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <DialogTitle className="text-2xl">Huiswerk preview: {submission.userEmail}</DialogTitle>
                                    <DialogDescription className="text-base">
                                      {submission.workshopTitle} - {submission.workshopDate}
                                    </DialogDescription>
                                  </div>
                                  <div className="flex gap-3">
                                    <Button 
                                      variant="default" 
                                      className="gap-2"
                                      onClick={() => handleDownload(submission.id, submission.fileName)}
                                    >
                                      <Download className="h-4 w-4" />
                                      Download PDF
                                    </Button>
                                  </div>
                                </div>
                              </DialogHeader>
                            </div>
                            <div className="flex-1 bg-slate-100 p-4 overflow-hidden">
                              <div className="w-full h-full rounded-lg border bg-white shadow-inner overflow-hidden">
                                {isPreviewLoading ? (
                                  <div className="h-full flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                      <p className="text-muted-foreground font-medium">Preview laden...</p>
                                    </div>
                                  </div>
                                ) : previewPdfData ? (
                                  <iframe 
                                    src={`${previewPdfData}#view=FitH&navpanes=0&toolbar=0`} 
                                    className="w-full h-full border-none" 
                                    style={{ width: '100%', height: '100%', display: 'block' }}
                                    title="PDF Preview"
                                  />
                                ) : (
                                  <div className="h-full flex items-center justify-center text-muted-foreground">
                                    Kon preview niet laden.
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleDownload(submission.id, submission.fileName)}
                          disabled={isDownloading === submission.id}
                        >
                          {isDownloading === submission.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <FileDown className="h-4 w-4" />
                          )}
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Verified Members & Registered Users grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verified Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Verified Members</CardTitle>
                  <CardDescription>Manage who can register</CardDescription>
                </div>
                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Verified Member</DialogTitle>
                      <DialogDescription>Add a new member who will be allowed to register</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddMember} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} required disabled={isAddingMember} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} required disabled={isAddingMember} />
                      </div>
                      <Button type="submit" className="w-full" disabled={isAddingMember}>
                        {isAddingMember ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Add Member"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {verifiedMembers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No verified members yet.</p>
                  ) : (
                    verifiedMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{member.fullName}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <Button size="sm" variant={member.status === "active" ? "outline" : "default"} onClick={() => handleToggleMemberStatus(member.id, member.status)}>
                          {member.status === "active" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Registered Users */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {registeredUsers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No registered users yet.</p>
                  ) : (
                    registeredUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-sm text-muted-foreground">Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Button size="sm" variant={user.status === "active" ? "outline" : "default"} onClick={() => handleToggleUserStatus(user.id, user.status)}>
                          {user.status === "active" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
