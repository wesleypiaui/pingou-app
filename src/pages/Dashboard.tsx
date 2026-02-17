import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import ProgressRing from '@/components/ProgressRing';
import StreakCounter from '@/components/StreakCounter';
import CelebrationModal from '@/components/CelebrationModal';
import HistoryList from '@/components/HistoryList';
import { Droplets, ChevronDown, ChevronUp } from 'lucide-react';

const ruleAmounts: Record<string, number> = {
  coffee: 5,
  round: 3,
  daily: 2,
};

const ruleLabels: Record<string, string> = {
  coffee: '☕ Cafézinho · R$ 5,00',
  round: '🔄 Arredondar · R$ 3,00',
  daily: '📅 Diário · R$ 2,00',
};

const Dashboard = () => {
  const {
    goalName, goalAmount, userName, totalSaved, streak,
    history, activeRules, addPingo, getProgress,
  } = useAppStore();

  const progress = getProgress();
  const [showHistory, setShowHistory] = useState(false);
  const [celebration, setCelebration] = useState<number | null>(null);
  const [justPinged, setJustPinged] = useState(false);

  const handlePingo = (ruleId: string) => {
    const amount = ruleAmounts[ruleId] || 2;
    addPingo(amount, ruleId);
    setJustPinged(true);
    setTimeout(() => setJustPinged(false), 600);

    // Check milestones
    const newProgress = ((totalSaved + amount) / goalAmount) * 100;
    const milestones = [10, 25, 50, 75, 100];
    for (const m of milestones) {
      if (progress < m && newProgress >= m) {
        setTimeout(() => setCelebration(m), 700);
        break;
      }
    }
  };

  const firstName = userName.split(' ')[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-hero px-6 pb-8 pt-10">
        <div className="mx-auto max-w-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Olá, {firstName}! 👋</p>
              <h1 className="text-xl font-extrabold text-foreground">{goalName}</h1>
            </div>
            {streak > 0 && <StreakCounter streak={streak} />}
          </div>

          {/* Progress */}
          <div className="flex flex-col items-center">
            <ProgressRing progress={progress} />
            <div className="mt-4 text-center">
              <p className="text-2xl font-extrabold text-foreground">
                R$ {totalSaved.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                de R$ {goalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-sm space-y-6">
          {/* Ping buttons */}
          <div>
            <h2 className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Registrar economia
            </h2>
            <div className="space-y-2">
              {activeRules.map((ruleId) => (
                <motion.button
                  key={ruleId}
                  onClick={() => handlePingo(ruleId)}
                  className="flex w-full items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-sm active:bg-mint-light"
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-base font-bold text-foreground">
                    {ruleLabels[ruleId] || ruleId}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-mint shadow-mint">
                    <Droplets className="h-5 w-5 text-primary-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Ping animation */}
          <AnimatePresence>
            {justPinged && (
              <motion.div
                className="text-center text-lg font-extrabold text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Pingou! 💧
              </motion.div>
            )}
          </AnimatePresence>

          {/* History toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex w-full items-center justify-between py-2 text-sm font-bold text-muted-foreground"
          >
            Histórico
            {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <HistoryList entries={history} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Celebration */}
      <CelebrationModal milestone={celebration} onClose={() => setCelebration(null)} />
    </div>
  );
};

export default Dashboard;
