<p align="center">
  <img src="https://img.icons8.com/fluency/96/000000/todo-list.png" width="120" alt="Todo UAI Logo" />
</p>

# ✅ Todo UAI - API de Gerenciamento de Tarefas

**Todo UAI** é uma API REST de lista de tarefas com aquele jeitinho mineiro: simples, direto e sem enrolação. Desenvolvida com **Express**, **TypeScript** e **MongoDB**, permite criar e gerenciar listas personalizadas, organizar tarefas com cores diferentes e marcar o que já foi feito com um clique.

A aplicação oferece autenticação via Google OAuth 2.0, garantindo segurança e praticidade no acesso.

---

## 🚀 Tecnologias

- [Express](https://expressjs.com/) - Framework web minimalista para Node.js
- [TypeScript](https://www.typescriptlang.org/) - JavaScript com tipagem estática
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL orientado a documentos
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
- [Passport.js](http://www.passportjs.org/) - Middleware de autenticação
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) - Autenticação via Google
- [Zod](https://zod.dev/) - Validação de schemas TypeScript-first
- [Swagger](https://swagger.io/) - Documentação interativa da API
- [Docker](https://www.docker.com/) - Containerização do banco de dados

---

## 📚 Documentação da API

- Acessar a documentação interativa da API no endereço: **http://localhost:3000/api-docs**

---

## 📦 Funcionalidades (MVP)

### Autenticação
- ✅ Login com Google OAuth 2.0
- ✅ Gerenciamento de sessões
- ✅ Logout seguro

### Usuários
- ✅ Cadastro automático via Google
- ✅ Visualização de perfil
- ✅ Atualização de dados do usuário
- ✅ Exclusão de conta
- ✅ Sistema de roles (user/admin)

### Listas de Tarefas
- ✅ Criar listas personalizadas
- ✅ Definir cores para organização visual
- ✅ Adicionar descrições às listas
- ✅ Editar e excluir listas
- ✅ Visualizar todas as listas de um usuário

### Tarefas
- ✅ Criar tarefas dentro de listas
- ✅ Adicionar notas às tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Editar e excluir tarefas
- ✅ Filtrar tarefas por lista

### Segurança
- ✅ Middleware de autenticação
- ✅ Validação de dados com Zod
- ✅ Proteção com Helmet
- ✅ CORS configurado

---

## 📦 Funcionalidades Futuras

#### Notificações
- Lembretes de tarefas
- Notificações por email

#### Compartilhamento
- Compartilhar listas com outros usuários
- Colaboração em tempo real

#### Prioridades e Prazos
- Definir prioridades para tarefas
- Adicionar datas de vencimento
- Visualização em calendário

#### Relatórios
- Estatísticas de produtividade
- Tarefas concluídas por período
- Exportação de dados

---

## 📝 Como Rodar Localmente

Siga o passo a passo abaixo para subir o projeto em ambiente local:

### 1. **Clone o repositório:**
```bash
git clone https://github.com/ThallesLana/todo-uai.git
cd todo-uai
```

### 2. **Instale as dependências:**
```bash
npm install
```

### 3. **Configure as variáveis de ambiente:**

Duplique o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:

```bash
cp .env.example .env
```

**Variáveis importantes:**
- `MONGODB_URI` - URI de conexão com o MongoDB
- `GOOGLE_CLIENT_ID` - Client ID do Google OAuth
- `GOOGLE_CLIENT_SECRET` - Client Secret do Google OAuth
- `SESSION_SECRET` - Chave secreta para sessões
- `PORT` - Porta da aplicação (padrão: 3000)

**Como obter credenciais do Google OAuth:**
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+ 
4. Crie credenciais OAuth 2.0
5. Configure as URLs de redirecionamento:
   - `http://localhost:3000/api/auth/google/callback`

### 4. **Configure o banco de dados (MongoDB via Docker):**
```bash
docker-compose up -d
```

Isso irá subir:
- Container MongoDB acessível em `localhost:27017`
- Mongo Express (interface web) em `localhost:8081`

### 5. **Inicie a aplicação em modo desenvolvimento:**
```bash
npm run dev
```

### 6. **Acesse a aplicação:**
- **API:** [http://localhost:3000](http://localhost:3000)
- **Documentação Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Health Check:** [http://localhost:3000/health](http://localhost:3000/health)
- **Mongo Express:** [http://localhost:8081](http://localhost:8081)

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Lint do código
npm run lint

# Formatar código
npm run format
```

---

## 📂 Estrutura do Projeto

```
src/
├── config/          # Configurações (database, passport, swagger)
├── controllers/     # Controladores das rotas
├── middlewares/     # Middlewares (auth, validação)
├── models/          # Modelos do Mongoose
├── routes/          # Definição das rotas
├── schemas/         # Schemas de validação (Zod)
├── services/        # Lógica de negócio
├── responses/       # Padronização de respostas
├── app.ts           # Configuração do Express
└── server.ts        # Inicialização do servidor
```

---

## 🎨 Paleta de Cores das Listas

As listas de tarefas podem ser personalizadas com as seguintes cores:

**Cores Claras:**
- 🔵 Azul Claro (`#87CEEB`)
- 🟢 Verde Claro (`#98FF98`)
- 🔴 Vermelho Claro (`#f54b4bff`)
- 🟡 Amarelo (`#FFFACD`)
- 🟠 Laranja (`#FFDAB9`)

**Cores Escuras:**
- 🔵 Azul Escuro (`#001F3F`)
- 🟢 Verde Escuro (`#228B22`)
- 🔴 Vermelho Escuro (`#800020`)
- ⚫ Cinza (`#2F4F4F`)
- 🟣 Roxo (`#8E4585`)

---

## 🔒 Autenticação

A API utiliza autenticação baseada em sessão com Passport.js e Google OAuth 2.0.

**Fluxo de autenticação:**
1. Usuário acessa `/api/auth/google`
2. É redirecionado para o login do Google
3. Após autorização, retorna para `/api/auth/google/callback`
4. Sessão é criada e usuário está autenticado
5. Cookie de sessão é armazenado no navegador

**Rotas protegidas** requerem autenticação via middleware `isAuthenticated`.

---

## 📊 Endpoints Principais

### Autenticação
- `GET /api/auth/google` - Iniciar login com Google
- `GET /api/auth/google/callback` - Callback do Google OAuth
- `GET /api/auth/logout` - Realizar logout

### Usuários
- `GET /api/users` - Listar todos os usuários (Admin)
- `GET /api/users/:id` - Buscar usuário por ID
- `PATCH /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Listas de Tarefas
- `GET /api/tasklist/:userId` - Listar listas de um usuário
- `POST /api/tasklist` - Criar nova lista
- `PATCH /api/tasklist/:id` - Atualizar lista
- `DELETE /api/tasklist/:id` - Deletar lista

### Tarefas
- `GET /api/tasks/:tasklistId` - Listar tarefas de uma lista
- `POST /api/tasks` - Criar nova tarefa
- `PATCH /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Deletar tarefa

---

## ⏳ Status do Projeto

- ✅ MVP concluído
- 🚧 Melhorias em andamento

---

## 👨‍💻 Autor

**Thalles Lana**
- GitHub: [@ThallesLana](https://github.com/ThallesLana)
- Email: contato@thalles-lana.dev

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Feito com ☕ e muito ❤️ em Minas Gerais
</p>
