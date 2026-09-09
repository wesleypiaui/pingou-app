import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppStore } from '@/store/useAppStore';
import { Target, ArrowRight, Loader2 } from 'lucide-react';

const GoalSetup = () => {
  const navigate = useNavigate();
  const { setGoal, setUser } = useAppStore();
  const [step, setStep] = useState<'goal' | 'user'>('goal');
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoalNext = async () => {
    if (!goalName.trim() || !goalAmount.trim() || loading) return;
    const amount = parseFloat(goalAmount);
    if (!amount || amount <= 0) {
      toast.error('Informe um valor maior que zero.');
      return;
    }
    setLoading(true);
    try {
      await setGoal(goalName.trim(), amount);
      toast.success('Meta salva! 🎯');
      setStep('user');
    } catch {
      toast.error('Não conseguimos salvar agora. Tente de novo.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    if (!userName.trim() || !userEmail.trim() || loading) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      toast.error('Digite um e-mail válido.');
      return;
    }
    setLoading(true);
    try {
      await setUser(userName.trim(), userEmail.trim());
      toast.success('Cofre criado! 💰');
      navigate('/rules-setup');
    } catch {
      toast.error('Não conseguimos criar seu cofre. Tente de novo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-hero px-6 py-12">
      <motion.div
        className="mx-auto w-full max-w-sm flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Progress dots */}
        <div className="mb-8 flex justify-center gap-2">
          <div className={`h-2 w-8 rounded-full ${step === 'goal' ? 'bg-gradient-mint' : 'bg-mint-light'}`} />
          <div className={`h-2 w-8 rounded-full ${step === 'user' ? 'bg-gradient-mint' : 'bg-mint-light'}`} />
        </div>

        {step === 'goal' ? (
          <motion.div
            key="goal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-light">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mb-2 text-2xl font-extrabold text-foreground">
              Qual é seu objetivo?
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Pode ser uma viagem, um curso, ou aquele presente especial.
            </p>

            <div className="space-y-4">
              <div>
                <label
            htmlFor="goal-name"
            className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider"
            >
            Nome do objetivo
            </label>
            <input
            id="goal-name"
            type="text"
                  placeholder="Ex: Viagem, Curso, Fone novo..."
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3.5 text-base font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                htmlFor="goal-amount"
                className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider"
                >
                Quanto quer guardar?
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-muted-foreground">
                    R$
                  </span>
                  <input
                  id="goal-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                    placeholder="500,00"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="w-full rounded-xl border border-input bg-card py-3.5 pl-12 pr-4 text-base font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleGoalNext}
              disabled={!goalName.trim() || !goalAmount.trim() || loading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-mint py-4 text-base font-bold text-primary-foreground shadow-mint disabled:opacity-40"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Próximo <ArrowRight className="h-5 w-5" /></>}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="user"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="mb-2 text-2xl font-extrabold text-foreground">
              Quase lá! 🎉
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Só precisamos do seu nome e e-mail para salvar seu progresso.
            </p>

            <div className="space-y-4">
              <div>
                <label
               htmlFor="user-name"
                className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider"
                >
                Seu nome
                </label>
                <input
                id="user-name"
               type="text"
               autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3.5 text-base font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="user-email"
                  className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider"
                  >
                  E-mail
                  </label>
                  <input
                  id="user-email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3.5 text-base font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <motion.button
              onClick={handleFinish}
              disabled={!userName.trim() || !userEmail.trim() || loading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-mint py-4 text-base font-bold text-primary-foreground shadow-mint disabled:opacity-40"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Criar meu cofre 💰'}
            </motion.button>

            <button
              onClick={() => setStep('goal')}
              className="tap-target mt-3 w-full py-2 text-sm font-semibold text-muted-foreground"
            >
              ← Voltar
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GoalSetup;
