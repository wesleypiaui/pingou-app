/**
 * Camada de serviços do Pingou.
 *
 * Todas as ações do usuário passam por aqui. Hoje os dados são simulados
 * (mock + LocalStorage). Quando o backend real estiver pronto, basta definir
 * VITE_API_URL e trocar as implementações mock pelas chamadas `request()`.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

const STORAGE_KEY = 'pingou-state';
const LATENCY = 450;

export interface PingoEntry {
  id: string;
  amount: number;
  rule: string;
  date: string;
}

export interface AccountPayload {
  goalName: string;
  goalAmount: number;
  userName: string;
  userEmail: string;
  activeRules: string[];
  totalSaved: number;
  streak: number;
  lastPingDate: string | null;
  history: PingoEntry[];
  onboardingDone: boolean;
}

const delay = (ms = LATENCY) => new Promise((r) => setTimeout(r, ms));

function readLocal(): Partial<AccountPayload> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* offline-safe */
  }
  return {};
}

function writeLocal(patch: Partial<AccountPayload>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readLocal(), ...patch }));
  } catch {
    /* offline-safe */
  }
}

/** Chamada HTTP genérica — usada assim que houver backend real. */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`Erro ${res.status} ao chamar ${path}`);
  return (await res.json()) as T;
}

/* ---------- Endpoints (mock) ---------- */

export const api = {
  async getAccount(): Promise<Partial<AccountPayload>> {
    // futuro: return request('/usuarios/me')
    await delay(150);
    return readLocal();
  },

  async saveGoal(name: string, amount: number) {
    // futuro: return request('/metas', { method: 'POST', body: JSON.stringify({ name, amount }) })
    await delay();
    writeLocal({ goalName: name, goalAmount: amount });
    return { goalName: name, goalAmount: amount };
  },

  async createAccount(userName: string, userEmail: string) {
    // futuro: return request('/usuarios', { method: 'POST', ... })
    await delay();
    writeLocal({ userName, userEmail });
    return { userName, userEmail };
  },

  async saveRules(activeRules: string[]) {
    // futuro: return request('/metas/regras', { method: 'PUT', ... })
    await delay();
    writeLocal({ activeRules, onboardingDone: true });
    return { activeRules };
  },

  async registerPingo(entry: PingoEntry, totals: { totalSaved: number; streak: number }) {
    // futuro: return request('/reservas', { method: 'POST', body: JSON.stringify(entry) })
    await delay(200);
    const current = readLocal();
    const history = [entry, ...(current.history ?? [])];
    writeLocal({ history, lastPingDate: entry.date, ...totals });
    return entry;
  },

  async deleteAccount() {
    // futuro: return request('/usuarios/me', { method: 'DELETE' })
    await delay(300);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    return { ok: true };
  },
};
