import { create } from 'zustand';

export interface PingoEntry {
  id: string;
  amount: number;
  rule: string;
  date: string;
}

export interface AppState {
  // Onboarding
  goalName: string;
  goalAmount: number;
  userName: string;
  userEmail: string;
  onboardingDone: boolean;

  // Rules
  activeRules: string[];

  // Savings
  totalSaved: number;
  streak: number;
  lastPingDate: string | null;
  history: PingoEntry[];

  // Actions
  setGoal: (name: string, amount: number) => void;
  setUser: (name: string, email: string) => void;
  completeOnboarding: () => void;
  toggleRule: (ruleId: string) => void;
  addPingo: (amount: number, rule: string) => void;
  getProgress: () => number;
  getMilestone: () => number | null;
  resetAccount: () => void;
}

const loadState = () => {
  try {
    const raw = localStorage.getItem('pingou-state');
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
};

const saveState = (state: Partial<AppState>) => {
  try {
    const current = loadState();
    localStorage.setItem('pingou-state', JSON.stringify({ ...current, ...state }));
  } catch {}
};

const stored = loadState();

export const useAppStore = create<AppState>((set, get) => ({
  goalName: stored.goalName || '',
  goalAmount: stored.goalAmount || 0,
  userName: stored.userName || '',
  userEmail: stored.userEmail || '',
  onboardingDone: stored.onboardingDone || false,
  activeRules: stored.activeRules || [],
  totalSaved: stored.totalSaved || 0,
  streak: stored.streak || 0,
  lastPingDate: stored.lastPingDate || null,
  history: stored.history || [],

  setGoal: (name, amount) => {
    set({ goalName: name, goalAmount: amount });
    saveState({ goalName: name, goalAmount: amount });
  },

  setUser: (name, email) => {
    set({ userName: name, userEmail: email });
    saveState({ userName: name, userEmail: email });
  },

  completeOnboarding: () => {
    set({ onboardingDone: true });
    saveState({ onboardingDone: true });
  },

  toggleRule: (ruleId) => {
    const current = get().activeRules;
    const next = current.includes(ruleId)
      ? current.filter(r => r !== ruleId)
      : [...current, ruleId];
    set({ activeRules: next });
    saveState({ activeRules: next });
  },

  addPingo: (amount, rule) => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = get().lastPingDate;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    const newStreak = lastDate === yesterday || lastDate === today
      ? (lastDate === today ? get().streak : get().streak + 1)
      : 1;

    const entry: PingoEntry = {
      id: Date.now().toString(),
      amount,
      rule,
      date: today,
    };

    const newTotal = get().totalSaved + amount;
    const newHistory = [entry, ...get().history];

    set({
      totalSaved: newTotal,
      streak: newStreak,
      lastPingDate: today,
      history: newHistory,
    });
    saveState({
      totalSaved: newTotal,
      streak: newStreak,
      lastPingDate: today,
      history: newHistory,
    });
  },

  getProgress: () => {
    const { totalSaved, goalAmount } = get();
    if (goalAmount <= 0) return 0;
    return Math.min((totalSaved / goalAmount) * 100, 100);
  },

  getMilestone: () => {
    const progress = get().getProgress();
    const milestones = [10, 25, 50, 75, 100];
    for (const m of milestones) {
      if (progress >= m && progress < m + 2) return m;
    }
    return null;
  },

  resetAccount: () => {
    localStorage.removeItem('pingou-state');
    set({
      goalName: '', goalAmount: 0, userName: '', userEmail: '',
      onboardingDone: false, activeRules: [], totalSaved: 0,
      streak: 0, lastPingDate: null, history: [],
    });
  },
}));
