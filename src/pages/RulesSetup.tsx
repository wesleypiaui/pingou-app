import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Coffee, ArrowDownUp, CalendarCheck, Check } from 'lucide-react';

const rules = [
  {
    id: 'coffee',
    icon: Coffee,
    emoji: '☕',
    title: 'O Cafézinho',
    description: 'Guardar R$ 5,00 toda vez que comprar um café.',
    amount: 5,
  },
  {
    id: 'round',
    icon: ArrowDownUp,
    emoji: '🔄',
    title: 'Arredondar',
    description: 'Guardar o troco virtual de compras quebradas.',
    amount: 3,
  },
  {
    id: 'daily',
    icon: CalendarCheck,
    emoji: '📅',
    title: 'Desafio Diário',
    description: 'Guardar R$ 2,00 todo dia de manhã.',
    amount: 2,
  },
];

const RulesSetup = () => {
  const navigate = useNavigate();
  const { activeRules, toggleRule, completeOnboarding } = useAppStore();

  const handleStart = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-hero px-6 py-12">
      <motion.div
        className="mx-auto w-full max-w-sm flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-2 text-2xl font-extrabold text-foreground">
          Escolha suas regras 🎯
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Ative pelo menos uma regra de economia. Você pode mudar depois!
        </p>

        <div className="space-y-3">
          {rules.map((rule, i) => {
            const active = activeRules.includes(rule.id);
            return (
              <motion.button
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={`relative flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                  active
                    ? 'border-primary bg-mint-light'
                    : 'border-border bg-card'
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                  active ? 'bg-gradient-mint shadow-mint' : 'bg-muted'
                }`}>
                  {rule.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground">{rule.title}</h3>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
                {active && (
                  <motion.div
                    className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          onClick={handleStart}
          disabled={activeRules.length === 0}
          className="mt-8 w-full rounded-2xl bg-gradient-mint py-4 text-base font-bold text-primary-foreground shadow-mint disabled:opacity-40"
          whileTap={{ scale: 0.97 }}
        >
          Começar a guardar 💧
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RulesSetup;
