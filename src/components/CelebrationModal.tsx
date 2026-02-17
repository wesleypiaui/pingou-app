import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

interface CelebrationModalProps {
  milestone: number | null;
  onClose: () => void;
}

const messages: Record<number, string> = {
  10: '🎉 Primeiros passos! 10% guardado!',
  25: '🚀 Um quarto do caminho! Continue!',
  50: '🏆 Metade da meta! Incrível!',
  75: '💪 75%! Quase lá!',
  100: '🎊 META ALCANÇADA! Parabéns!',
};

const CelebrationModal = ({ milestone, onClose }: CelebrationModalProps) => {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-xs rounded-2xl bg-card p-8 text-center shadow-mint"
          initial={{ scale: 0.7, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.7, y: 40 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute right-3 top-3 text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Trophy className="mx-auto mb-4 h-16 w-16 text-gold" />
          </motion.div>
          <h2 className="mb-2 text-xl font-extrabold text-foreground">Pequena Vitória!</h2>
          <p className="text-base font-semibold text-muted-foreground">
            {messages[milestone] || `${milestone}% concluído!`}
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-gradient-mint py-3 font-bold text-primary-foreground shadow-mint"
          >
            Continuar 💚
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CelebrationModal;
