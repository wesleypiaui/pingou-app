import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-hero px-6 py-12">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-mint shadow-mint"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Droplets className="h-10 w-10 text-primary-foreground" />
        </motion.div>

        <h1 className="mb-3 text-3xl font-extrabold text-foreground">
          Pingou
        </h1>
        <p className="mb-2 text-lg font-semibold text-gradient">
          Guarde dinheiro sem perceber.
        </p>
        <p className="mb-10 max-w-xs text-sm text-muted-foreground leading-relaxed">
          Transforme pequenos gastos do dia a dia em conquistas. Cada pingo conta! 💧
        </p>

        <motion.button
          onClick={() => navigate('/goal-setup')}
          className="w-full max-w-xs rounded-2xl bg-gradient-mint py-4 text-lg font-bold text-primary-foreground shadow-mint"
          whileTap={{ scale: 0.97 }}
        >
          Começar agora
        </motion.button>

        <p className="mt-4 text-xs text-muted-foreground">
          Sem cartão. Sem conta bancária. Só hábitos.
        </p>
      </motion.div>
    </div>
  );
};

export default Welcome;
