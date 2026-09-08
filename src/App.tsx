import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { useDarkMode } from "@/hooks/useDarkMode";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";
import GoalSetup from "./pages/GoalSetup";
import RulesSetup from "./pages/RulesSetup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Settings from "./pages/Settings";
import BottomTabs from "./components/BottomTabs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const appTabPaths = ["/dashboard", "/history", "/settings"];

const AppRoutes = () => {
  const { onboardingDone } = useAppStore();
  const { pathname } = useLocation();
  useDarkMode();


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/comecar" element={onboardingDone ? <Navigate to="/dashboard" /> : <Welcome />} />
        <Route path="/goal-setup" element={<GoalSetup />} />
        <Route path="/rules-setup" element={<RulesSetup />} />
        <Route path="/dashboard" element={onboardingDone ? <Dashboard /> : <Navigate to="/comecar" />} />
        <Route path="/history" element={onboardingDone ? <History /> : <Navigate to="/comecar" />} />
        <Route path="/settings" element={onboardingDone ? <Settings /> : <Navigate to="/comecar" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {onboardingDone && appTabPaths.includes(pathname) && <BottomTabs />}
    </>
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
