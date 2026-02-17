import { PingoEntry } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

interface HistoryListProps {
  entries: PingoEntry[];
}

const ruleLabels: Record<string, string> = {
  coffee: '☕ Cafézinho',
  round: '🔄 Arredondar',
  daily: '📅 Desafio Diário',
  manual: '💧 Manual',
};

const HistoryList = ({ entries }: HistoryListProps) => {
  if (entries.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <Droplets className="mx-auto mb-2 h-8 w-8 opacity-40" />
        <p className="text-sm font-semibold">Nenhum pingo ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.slice(0, 20).map((entry, i) => (
        <motion.div
          key={entry.id}
          className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-light text-sm">
              💧
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                {ruleLabels[entry.rule] || entry.rule}
              </p>
              <p className="text-xs text-muted-foreground">{entry.date}</p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-primary">
            +R$ {entry.amount.toFixed(2)}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default HistoryList;
