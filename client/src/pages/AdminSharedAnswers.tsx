import { useState, useEffect } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Users, FileText, ChevronDown, ChevronUp, User } from "lucide-react";

interface SharedAnswer {
  workshopId: string;
  questionId: string;
  answer: string;
  updatedAt: string;
}

interface UserWithAnswers {
  userId: number;
  email: string;
  fullName: string;
  answerCount: number;
  answers: SharedAnswer[];
}

const workshopTitles: Record<string, string> = {
  workshop1: "Workshop 1: De Maskers Ontmaskerd",
  "workshop1-dag2": "Workshop 1 Dag 2",
  workshop2: "Workshop 2: Karakterstructuren",
  workshop3: "Workshop 3: Het Innerlijk Kind",
  workshop4: "Workshop 4: Transformatie",
};

export default function AdminSharedAnswers() {
  const { token } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [users, setUsers] = useState<UserWithAnswers[]>([]);
  const [totalUsersSharing, setTotalUsersSharing] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [expandedWorkshops, setExpandedWorkshops] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSharedAnswers = async () => {
      try {
        const response = await fetch("/api/admin/shared-answers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setTotalUsersSharing(data.totalUsersSharing);
        } else {
          toast.error("Kon gedeelde antwoorden niet laden");
        }
      } catch (error) {
        toast.error("Er ging iets mis");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSharedAnswers();
  }, [token]);

  const toggleUser = (userId: number) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const toggleWorkshop = (key: string) => {
    setExpandedWorkshops(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const groupAnswersByWorkshop = (answers: SharedAnswer[]) => {
    const grouped: Record<string, SharedAnswer[]> = {};
    answers.forEach(answer => {
      if (!grouped[answer.workshopId]) {
        grouped[answer.workshopId] = [];
      }
      grouped[answer.workshopId].push(answer);
    });
    return grouped;
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
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Button>
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Gedeelde Antwoorden</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Deelnemers die delen
              </CardTitle>
              <CardDescription>Gebruikers met delen ingeschakeld</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalUsersSharing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Met antwoorden
              </CardTitle>
              <CardDescription>Deelnemers die antwoorden hebben gedeeld</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Deelnemers</CardTitle>
            <CardDescription>Klik op een deelnemer om hun antwoorden te bekijken</CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nog geen deelnemers hebben antwoorden gedeeld.
              </p>
            ) : (
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.userId} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleUser(user.userId)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {user.answerCount} antwoorden
                        </span>
                        {expandedUser === user.userId ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </button>

                    {expandedUser === user.userId && (
                      <div className="border-t bg-muted/20 p-4">
                        {Object.entries(groupAnswersByWorkshop(user.answers)).map(([workshopId, answers]) => {
                          const workshopKey = `${user.userId}-${workshopId}`;
                          const isWorkshopExpanded = expandedWorkshops[workshopKey] !== false;

                          return (
                            <div key={workshopId} className="mb-4 last:mb-0">
                              <button
                                onClick={() => toggleWorkshop(workshopKey)}
                                className="w-full flex items-center justify-between py-2 text-left"
                              >
                                <h4 className="font-medium text-primary">
                                  {workshopTitles[workshopId] || workshopId}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {answers.length} antwoorden
                                  </span>
                                  {isWorkshopExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              </button>

                              {isWorkshopExpanded && (
                                <div className="space-y-3 mt-2">
                                  {answers.map((answer) => (
                                    <div
                                      key={`${answer.workshopId}-${answer.questionId}`}
                                      className="bg-white rounded-lg p-4 border"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Vraag: {answer.questionId}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(answer.updatedAt).toLocaleDateString("nl-NL", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </span>
                                      </div>
                                      <p className="text-sm whitespace-pre-wrap">{answer.answer}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
