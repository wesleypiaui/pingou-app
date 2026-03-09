# Pingou API

API REST do projeto Pingou construída com **TypeScript + Express + SQLite**.

---

## 🛠️ Tecnologias

| Pacote | Função |
|--------|--------|
| TypeScript | Tipagem estática |
| Express | Servidor HTTP |
| better-sqlite3 | Banco de dados SQLite síncrono |
| dotenv | Variáveis de ambiente |
| cors | Libera acesso do app mobile |
| ts-node-dev | Hot reload em desenvolvimento |

---

## 📁 Estrutura

```
pingou_api/
├── src/
│   ├── server.ts               ← ponto de entrada
│   ├── database/
│   │   └── db.ts               ← conexão SQLite + criação das tabelas
│   ├── models/
│   │   └── types.ts            ← interfaces TypeScript
│   ├── controllers/
│   │   ├── usuariosController.ts
│   │   ├── metasController.ts
│   │   └── reservasController.ts
│   ├── routes/
│   │   ├── usuarios.ts
│   │   ├── metas.ts
│   │   └── reservas.ts
│   └── middleware/
│       └── errorHandler.ts
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## ▶️ Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar o .env

```bash
cp .env.example .env
```

Conteúdo do `.env`:
```
PORT=3000
DB_PATH=./pingou.db
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

### 4. Build para produção

```bash
npm run build
npm start
```

---

## 🔌 Endpoints

### Usuários

| Método | Rota | Body | Resposta |
|--------|------|------|----------|
| POST | `/usuarios` | `{ nome }` | `{ id, nome }` |
| GET | `/usuarios/:id` | — | `{ id, nome, criado_em }` |

### Metas

| Método | Rota | Body | Resposta |
|--------|------|------|----------|
| POST | `/metas` | `{ usuario_id, nome, emoji?, valor_alvo }` | `{ id, nome, valor_alvo, ... }` |
| GET | `/metas/:id` | — | `{ id, nome, valor_atual, ... }` |
| GET | `/metas/usuario/:usuario_id` | — | `[ { id, nome, ... } ]` |

### Reservas

| Método | Rota | Body | Resposta |
|--------|------|------|----------|
| POST | `/reservas` | `{ meta_id, valor }` | `{ mensagem }` |
| GET | `/reservas/:meta_id` | — | `[ { id, valor, criado_em } ]` |

> `POST /reservas` atualiza automaticamente o `valor_atual` da meta via transação SQLite.

---

## 🗄️ Banco de dados

O arquivo `pingou.db` é criado automaticamente na primeira execução.

```sql
usuarios   → id, nome, criado_em
metas      → id, usuario_id, nome, emoji, valor_alvo, valor_atual, criado_em
reservas   → id, meta_id, valor, criado_em
```

---

## 🧪 Testando com curl

```bash
# Criar usuário
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Lima"}'

# Criar meta
curl -X POST http://localhost:3000/metas \
  -H "Content-Type: application/json" \
  -d '{"usuario_id": 1, "nome": "Viagem", "emoji": "✈️", "valor_alvo": 1500}'

# Registrar reserva
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{"meta_id": 1, "valor": 50}'

# Ver progresso da meta
curl http://localhost:3000/metas/1
```
