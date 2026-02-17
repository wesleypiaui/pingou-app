import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import Welcome from "./pages/Welcome";
import GoalSetup from "./pages/GoalSetup";
import RulesSetup from "./pages/RulesSetup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { onboardingDone } = useAppStore();

  return (
    <Routes>
      <Route path="/" element={onboardingDone ? <Navigate to="/dashboard" /> : <Welcome />} />
      <Route path="/goal-setup" element={<GoalSetup />} />
      <Route path="/rules-setup" element={<RulesSetup />} />
      <Route path="/dashboard" element={onboardingDone ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
