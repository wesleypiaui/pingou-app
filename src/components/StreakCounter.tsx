import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter = ({ streak }: StreakCounterProps) => {
  return (
    <motion.div
      className="flex items-center gap-2 rounded-full bg-gold-light px-4 py-2"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Flame className="h-5 w-5 text-gold" />
      <span className="text-sm font-bold text-accent-foreground">
        {streak} {streak === 1 ? 'dia' : 'dias'} seguidos
      </span>
    </motion.div>
  );
};

export default StreakCounter;
