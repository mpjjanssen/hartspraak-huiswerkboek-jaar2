import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { EncryptionProvider } from "./contexts/EncryptionContext";
import { TestProvider } from "./contexts/TestContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import Home from "./pages/Home";
import Aandachtspunten from "./pages/Aandachtspunten";
import Workshop1 from "./pages/Workshop1";
import Workshop2 from "./pages/Workshop2";
import Workshop3 from "./pages/Workshop3";
import Workshop4 from "./pages/Workshop4";
import Workshop5 from "./pages/Workshop5";
import Workshop6 from "./pages/Workshop6";
import Referenties from "./pages/Referenties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsage from "./pages/AdminUsage";
import AdminSharedAnswers from "./pages/AdminSharedAnswers";
import Privacy from "./pages/Privacy";
import TestIntro from "./pages/TestIntro";
import TestPart1 from "./pages/TestPart1";
import TestPart2 from "./pages/TestPart2";
import TestResults from "./pages/TestResults";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function MemberRouter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={() => (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )} />
          <Route path="/aandachtspunten" component={() => (
            <ProtectedRoute>
              <Aandachtspunten />
            </ProtectedRoute>
          )} />
          <Route path="/workshop/1" component={() => (
            <ProtectedRoute>
              <Workshop1 />
            </ProtectedRoute>
          )} />
          <Route path="/workshop/2" component={() => (
            <ProtectedRoute>
              <Workshop2 />
            </ProtectedRoute>
          )} />
          <Route path="/workshop/3" component={() => (
            <ProtectedRoute>
              <Workshop3 />
            </ProtectedRoute>
          )} />
          <Route path="/workshop/4" component={() => (
            <ProtectedRoute>
              <Workshop4 />
            </ProtectedRoute>
          )} />
          <Route path="/workshop/5" component={() => (
            <ProtectedRoute>
              <Workshop5 />
            </ProtectedRoute>
          )} />
          <Route path="/workshop/6" component={() => (
            <ProtectedRoute>
              <Workshop6 />
            </ProtectedRoute>
          )} />
          {/* Karakterstructuren Test routes */}
          <Route path="/test" component={() => (
            <ProtectedRoute>
              <TestIntro />
            </ProtectedRoute>
          )} />
          <Route path="/test/deel1" component={() => (
            <ProtectedRoute>
              <TestPart1 />
            </ProtectedRoute>
          )} />
          <Route path="/test/deel2" component={() => (
            <ProtectedRoute>
              <TestPart2 />
            </ProtectedRoute>
          )} />
          <Route path="/test/resultaten" component={() => (
            <ProtectedRoute>
              <TestResults />
            </ProtectedRoute>
          )} />
          <Route path="/referenties" component={() => (
            <ProtectedRoute>
              <Referenties />
            </ProtectedRoute>
          )} />
          <Route path="/privacy" component={() => (
            <ProtectedRoute>
              <Privacy />
            </ProtectedRoute>
          )} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public auth routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={() => (
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      )} />
      <Route path="/admin" component={() => (
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      )} />
      <Route path="/admin/usage" component={() => (
        <AdminProtectedRoute>
          <AdminUsage />
        </AdminProtectedRoute>
      )} />
      <Route path="/admin/shared-answers" component={() => (
        <AdminProtectedRoute>
          <AdminSharedAnswers />
        </AdminProtectedRoute>
      )} />

      {/* Protected member routes */}
      <Route component={MemberRouter} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <AdminAuthProvider>
            <EncryptionProvider>
              <TestProvider>
                <TooltipProvider>
                  <Toaster />
                  <Router />
                </TooltipProvider>
              </TestProvider>
            </EncryptionProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
