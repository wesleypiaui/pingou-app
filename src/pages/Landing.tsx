import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplets, Sparkles, Wand2, Trophy, ArrowRight, Mail } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Simplicidade Radical',
    text: 'Sem planilhas, sem burocracia. Um toque registra sua economia e pronto.',
  },
  {
    icon: Wand2,
    title: 'Regras de Economia Automáticas',
    text: 'Cafézinho, arredondamento e desafio diário: escolha as regras que combinam com sua rotina.',
  },
  {
    icon: Trophy,
    title: 'Gamificação',
    text: 'Sequências, marcos comemorativos e barra de progresso que dão vontade de continuar.',
  },
];

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* Nav */}
    <header className="safe-area-top sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-mint shadow-mint">
            <Droplets className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold text-foreground">Pingou</span>
        </div>
        <Link
          to="/comecar"
          className="tap-target rounded-xl bg-gradient-mint px-4 py-2 text-sm font-bold text-primary-foreground shadow-mint"
        >
          Começar Agora
        </Link>
      </div>
    </header>

    {/* Hero */}
    <section className="bg-gradient-hero px-5 py-16 sm:py-24">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
          Transforme pequenos momentos em grandes conquistas com o Pingou
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          O Pingou é um gerenciador de hábitos de economia — não um banco complexo. Nada de contas,
          cartões ou tarifas: só o prazer de ver seu objetivo se aproximar a cada pingo.
        </p>
        <Link
          to="/comecar"
          className="tap-target inline-flex items-center gap-2 rounded-2xl bg-gradient-mint px-8 py-4 text-base font-bold text-primary-foreground shadow-mint sm:text-lg"
        >
          Começar Agora <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-4 text-xs font-semibold text-muted-foreground">
          Sem cartão. Sem conta bancária. Só hábitos. 💧
        </p>
      </motion.div>
    </section>

    {/* Features */}
    <section id="features" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-2xl font-extrabold text-foreground sm:text-3xl">
          Por que o Pingou funciona
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              className="rounded-3xl bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-light">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-extrabold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* CTA final */}
    <section className="px-5 pb-16">
      <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-mint px-6 py-12 text-center shadow-mint">
        <h2 className="mb-3 text-2xl font-extrabold text-primary-foreground sm:text-3xl">
          Seu próximo objetivo começa com um pingo
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm text-primary-foreground/90">
          Defina sua meta em menos de um minuto e comece a jogar contra os seus próprios gastos.
        </p>
        <Link
          to="/comecar"
          className="tap-target inline-flex items-center gap-2 rounded-2xl bg-card px-7 py-3.5 text-base font-bold text-foreground shadow-sm"
        >
          Começar Agora <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>

    {/* Rodapé */}
    <footer id="sobre" className="border-t border-border px-5 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <span className="font-extrabold text-foreground">Pingou</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Ferramenta comportamental de hábitos de economia. Não movimentamos dinheiro real.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Sobre o Projeto
          </h3>
          <p className="text-sm text-muted-foreground">
            Prova de Conceito desenvolvida pelo <strong className="text-foreground">Grupo 11 — Senac</strong>,
            como parte do projeto integrador de desenvolvimento de soluções digitais.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Contato
          </h3>
          <a
            href="mailto:grupo11.pingou@senac.br"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Mail className="h-4 w-4" /> grupo11.pingou@senac.br
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pingou · Grupo 11 — Senac. Todos os direitos reservados.
      </p>
    </footer>
  </div>
);

export default Landing;
