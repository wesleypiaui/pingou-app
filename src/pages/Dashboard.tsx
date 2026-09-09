import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import ProgressRing from '@/components/ProgressRing';
import StreakCounter from '@/components/StreakCounter';
import CelebrationModal from '@/components/CelebrationModal';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { toast } from 'sonner';
import { Droplets, RefreshCw } from 'lucide-react';

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
    activeRules, addPingo, getProgress,
  } = useAppStore();

  const progress = getProgress();
  const [celebration, setCelebration] = useState<number | null>(null);
  const [justPinged, setJustPinged] = useState(false);

  const { containerRef, pullDistance, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh();

  const handlePingo = (ruleId: string) => {
    const amount = ruleAmounts[ruleId] || 2;
    void addPingo(amount, ruleId).catch(() =>
      toast.error('Registrado offline — vamos sincronizar depois.')
    );
    toast.success(`Pingou! R$ ${amount.toFixed(2)} guardados 💧`);
    setJustPinged(true);
    setTimeout(() => setJustPinged(false), 600);

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
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col bg-background pb-24"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull indicator */}
      {pullDistance > 0 && (
        <div className="flex justify-center" style={{ height: pullDistance }}>
          <motion.div animate={{ rotate: pullDistance > 50 ? 180 : 0 }} className="pt-2">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="safe-area-top bg-gradient-hero px-6 pb-8 pt-10">
        <div className="mx-auto max-w-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Olá, {firstName}! 👋</p>
              <h1 className="text-xl font-extrabold text-foreground">{goalName}</h1>
            </div>
            {streak > 0 && <StreakCounter streak={streak} />}
          </div>

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
          <div>
            <h2 className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Registrar economia
            </h2>
            <div className="space-y-2">
  {activeRules.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-6 text-center">
      <p className="text-sm font-bold text-foreground">
        Nenhuma regra ativa ainda
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Ative uma regra de economia para começar a registrar seus pingos.
      </p>
    </div>
  ) : (
    activeRules.map((ruleId) => (
      <motion.button
        key={ruleId}
        onClick={() => handlePingo(ruleId)}
        className="tap-target flex w-full items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-sm active:bg-accent"
        whileTap={{ scale: 0.97 }}
      >
        <span className="text-base font-bold text-foreground">
          {ruleLabels[ruleId] || ruleId}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-mint shadow-mint">
          <Droplets className="h-5 w-5 text-primary-foreground" />
        </div>
      </motion.button>
         ))
           )}
          </div>
          </div>

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
        </div>
      </div>

      <CelebrationModal milestone={celebration} onClose={() => setCelebration(null)} />
    </div>
  );
};

export default Dashboard;
