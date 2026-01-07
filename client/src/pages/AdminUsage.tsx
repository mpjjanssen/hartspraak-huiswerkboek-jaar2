import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Users, MessageSquare, FileText, Shield } from "lucide-react";
import { APP_TITLE } from "@/const";

interface UserStats {
  userId: number;
  email: string;
  answerCount: number;
  conversationCount: number;
  lastActivity: string | null;
}

interface UsageStats {
  totalUsers: number;
  totalAnswers: number;
  totalConversations: number;
  totalAiCalls: number;
  users: UserStats[];
}

export default function AdminUsage() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/usage-stats', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch usage statistics');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!stats) return;

    const headers = ['Email', 'Aantal Antwoorden', 'Aantal AI Conversaties', 'Laatste Activiteit'];
    const rows = stats.users.map(user => [
      user.email,
      user.answerCount.toString(),
      user.conversationCount.toString(),
      user.lastActivity || 'Nooit',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usage-stats-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Statistieken laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Fout</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchStats}>Opnieuw proberen</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{APP_TITLE} - Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Gebruiksstatistieken en metadata</p>
            </div>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporteer CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Privacy Notice */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Shield className="h-5 w-5" />
              Privacy Garantie
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800">
            <p className="mb-2">
              <strong>Wat u KUNT zien:</strong> Email adressen, aantal antwoorden, aantal AI conversaties, en laatste activiteit datum.
            </p>
            <p>
              <strong>Wat u NIET kunt zien:</strong> De inhoud van antwoorden en AI conversaties is end-to-end versleuteld. 
              Alleen de gebruiker zelf kan deze inhoud lezen. Als beheerder heeft u geen toegang tot de encryptie sleutels.
            </p>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Gebruikers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Antwoorden</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnswers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal AI Conversaties</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConversations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal AI Calls</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAiCalls}</div>
              <p className="text-xs text-muted-foreground mt-1">Voor kosten tracking</p>
            </CardContent>
          </Card>
        </div>

        {/* User Statistics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Gebruikers Statistieken</CardTitle>
            <CardDescription>
              Overzicht van gebruikersactiviteit (metadata only - geen inhoud)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Antwoorden</TableHead>
                  <TableHead className="text-right">AI Conversaties</TableHead>
                  <TableHead className="text-right">Laatste Activiteit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Geen gebruikers gevonden
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.users.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell className="text-right">{user.answerCount}</TableCell>
                      <TableCell className="text-right">{user.conversationCount}</TableCell>
                      <TableCell className="text-right">
                        {user.lastActivity 
                          ? new Date(user.lastActivity).toLocaleDateString('nl-NL', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Nooit'
                        }
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
