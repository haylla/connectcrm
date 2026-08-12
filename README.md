# ConnectCRM

> CRM web para gestão de contatos, conversas e atendimento integrado ao WhatsApp, desenvolvido como projeto de portfólio e evolução de uma solução SaaS.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js-339933)
![Database](https://img.shields.io/badge/database-MySQL-4479A1)
![UI](https://img.shields.io/badge/UI-Material%20UI-007FFF)
![API](https://img.shields.io/badge/API-REST-000000)

## Sobre o projeto

O **ConnectCRM** é uma aplicação web criada para centralizar o relacionamento com clientes e organizar o atendimento comercial em um único ambiente.

A proposta é unir **CRM, gestão de contatos, pipeline, conversas e WhatsApp**, criando uma base para automação de atendimento e integração com Inteligência Artificial.

O projeto está sendo desenvolvido de forma incremental, utilizando uma arquitetura em camadas para separar responsabilidades entre **Controller, Service e Repository**.

> **Projeto em desenvolvimento:** algumas funcionalidades já estão implementadas e outras fazem parte do roadmap.

## Objetivos

- Centralizar contatos e informações de clientes.
- Organizar oportunidades e processos comerciais.
- Registrar o histórico de conversas.
- Permitir atendimento diretamente pelo CRM.
- Integrar o atendimento com WhatsApp.
- Preparar a aplicação para múltiplas empresas e usuários.
- Criar uma base para automações e atendimento com IA.

## Funcionalidades

### Autenticação
- Login de usuários.
- Autenticação baseada em JWT.
- Senhas protegidas com bcrypt.
- Estrutura preparada para controle de permissões.

### Usuários
- Cadastro e gerenciamento de usuários.
- Listagem de usuários.
- Edição e gerenciamento através da interface administrativa.
- Estrutura preparada para diferentes perfis de acesso.

### Contatos
- Cadastro de contatos.
- Listagem de contatos.
- Organização dos dados dos clientes.
- Associação de contatos às empresas.

### Conversas
- Lista de conversas.
- Seleção de contato/conversa.
- Histórico persistido no banco de dados.
- Interface de chat.
- Envio de mensagens pelo CRM.
- Estrutura de conversas separada dos contatos.
- Organização em camadas no backend.

### WhatsApp
O projeto possui integração com serviços utilizados no fluxo de WhatsApp, incluindo a **Evolution API**, permitindo que o CRM participe do fluxo de envio e recebimento de mensagens.

A arquitetura também foi pensada para integração com automações externas, incluindo fluxos com **n8n** e agentes de IA.

### Dashboard
Estrutura de dashboard para acompanhamento de indicadores e informações comerciais.

### Pipeline / Kanban
O projeto possui estrutura orientada a pipeline e Kanban, com evolução planejada para gerenciamento completo das oportunidades.

## Arquitetura

```text
┌──────────────────────────────┐
│           React              │
│      Material UI / Axios     │
└──────────────┬───────────────┘
               │ REST / JSON
               ▼
┌──────────────────────────────┐
│          Express             │
│            API               │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│         Controllers          │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│           Services           │
│       Regras de negócio      │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│         Repositories         │
│       Acesso aos dados       │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│            MySQL             │
└──────────────────────────────┘
```

### Fluxo de mensagens

```text
Usuário
   │
   ▼
React / Chat
   │
   ▼
REST API
   │
   ▼
MessageController
   │
   ▼
MessageService
   │
   ├──────────────► ConversationService
   │                       │
   │                       ▼
   │               ConversationRepository
   │
   ▼
MessageRepository
   │
   ▼
MySQL
   │
   ▼
Integração WhatsApp / Evolution API
```

## Tecnologias

### Frontend
- React
- Vite
- JavaScript / ES6+
- Material UI (MUI)
- Axios
- React Router
- Componentização
- Hooks (`useState`, `useEffect`)

### Backend
- Node.js
- Express
- REST API
- JWT
- bcrypt
- Arquitetura Controller / Service / Repository

### Banco de dados
- MySQL

### Integrações
- Evolution API
- n8n
- WhatsApp
- APIs REST
- Preparação para integração com IA

### Ferramentas
- Git
- GitHub
- Thunder Client
- XAMPP
- phpMyAdmin

## Estrutura do projeto

```text
ConnectCRM/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   ├── Sidebar/
│   │   │   └── Users/
│   │   ├── pages/
│   │   │   ├── Conversations/
│   │   │   └── Users/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Modelo de dados

```text
             ┌──────────────┐
             │   Companies  │
             └──────┬───────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     ┌─────────┐         ┌──────────┐
     │  Users  │         │ Contacts │
     └─────────┘         └────┬─────┘
                              │
                              ▼
                       ┌──────────────┐
                       │ Conversations│
                       └──────┬───────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   Messages   │
                       └──────────────┘
```

A documentação do projeto define entidades como `companies`, `users`, `contacts`, `conversations`, `messages` e `whatsapp_instances`, formando a base para uma arquitetura multiempresa.

## Fluxo de autenticação

```text
Login
  │
  ▼
React
  │
  ▼
POST /api/auth/login
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
MySQL
  │
  ▼
JWT
  │
  ▼
React
```

## Como executar

### Pré-requisitos

- Node.js
- npm
- MySQL
- Git

O projeto foi desenvolvido/testado localmente utilizando ambiente com XAMPP/phpMyAdmin.

### 1. Clone o repositório

```bash
git clone https://github.com/haylla/ConnectCRM.git
cd ConnectCRM
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

Crie:

```text
backend/.env
```

Exemplo:

```env
PORT=3001

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=connectcrm

JWT_SECRET=sua_chave_secreta
```

> **Nunca publique o arquivo `.env`.** As credenciais devem permanecer somente no ambiente local.

### 4. Inicie o backend

```bash
npm run dev
```

ou, conforme os scripts configurados no projeto:

```bash
npm start
```

### 5. Instale as dependências do frontend

Em outro terminal:

```bash
cd frontend
npm install
```

### 6. Inicie o frontend

```bash
npm run dev
```

## Testes da API

Durante o desenvolvimento, os endpoints foram testados utilizando ferramentas como **Thunder Client**, validando o fluxo:

```text
Request
   ↓
Express
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
```

Um exemplo do fluxo de mensagens:

```text
POST /api/messages
        ↓
MessageController
        ↓
MessageService
        ↓
ConversationService
        ↓
ConversationRepository
        ↓
MessageRepository
        ↓
MySQL
```

## Roadmap

### Atendimento
- [x] Cadastro de contatos
- [x] Listagem de contatos
- [x] Estrutura de conversas
- [x] Histórico de mensagens
- [x] Envio de mensagens
- [ ] Atualização automática do histórico
- [ ] Recebimento em tempo real
- [ ] Socket.IO
- [ ] Scroll automático
- [ ] Envio com Enter

### Usuários e segurança
- [x] Estrutura de usuários
- [x] Cadastro/gerenciamento de usuários
- [x] JWT
- [x] bcrypt
- [ ] Perfis e permissões completos
- [ ] Proteção granular de rotas
- [ ] Contexto de autenticação no frontend

### CRM
- [x] Contatos
- [x] Dashboard
- [ ] Kanban completo
- [ ] Pipeline completo
- [ ] Tags
- [ ] Relatórios
- [ ] Campanhas

### Multiempresa
- [x] Estrutura inicial de empresas
- [x] Relacionamento empresa → usuários
- [x] Relacionamento empresa → contatos
- [ ] Isolamento completo de dados por empresa
- [ ] Gestão de planos
- [ ] Controle de limites

### WhatsApp e IA
- [x] Integração com fluxo de WhatsApp
- [x] Estrutura para mensagens recebidas
- [x] Integração com Evolution API
- [ ] Sincronização em tempo real
- [ ] Integração completa com n8n
- [ ] Registro das respostas da IA no CRM
- [ ] Atendimento híbrido IA + humano

## Decisões técnicas

O projeto foi estruturado para evitar que a lógica de negócio fique concentrada diretamente nos controllers.

A separação:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

permite maior organização, manutenção e evolução do código.

No frontend, a aplicação utiliza componentes reutilizáveis e separação entre páginas, componentes, rotas e serviços de API.

##Evolução do projeto

O ConnectCRM começou como uma aplicação focada em:

```text
Empresa
   ↓
Contatos
```

e evoluiu para:

```text
Empresa
   │
   ├── Usuários
   │
   ├── Contatos
   │
   ├── Conversas
   │       │
   │       └── Mensagens
   │
   └── WhatsApp
           │
           ├── Evolution API
           └── IA / automações
```

Essa evolução permite que o projeto avance de um CRUD de contatos para uma plataforma de **atendimento e relacionamento com clientes**.

## O que este projeto demonstra

- Desenvolvimento frontend com React.
- Desenvolvimento backend com Node.js e Express.
- Construção e consumo de APIs REST.
- Autenticação com JWT.
- Criptografia de senhas com bcrypt.
- Integração com MySQL.
- Arquitetura em camadas.
- Componentização de interfaces.
- Gerenciamento de estado no React.
- Integração com APIs externas.
- Integração com WhatsApp.
- Integração com ferramentas de automação.
- Git e GitHub.
- Debugging e testes de API.
- Evolução incremental de produto.

##  Sobre

O **ConnectCRM** é um projeto desenvolvido para aprofundar conhecimentos em desenvolvimento web full stack e transformar necessidades reais de atendimento e relacionamento com clientes em uma aplicação funcional.

O projeto representa uma evolução de aplicações tradicionais para uma arquitetura moderna baseada em **React + Node.js + APIs REST + MySQL**, com integrações externas e automação.

## Visão geral

## O ConnectCRM reúne em uma única aplicação:

Tela de login: 
<img width="997" height="944" alt="image" src="https://github.com/user-attachments/assets/547d4dc1-15f7-40d8-b563-c79a847f2fba" />
Dashboard:
<img width="1000" height="955" alt="image" src="https://github.com/user-attachments/assets/6e698946-d0f6-448b-9305-ae63077980c6" />
Contatos: 
<img width="1072" height="950" alt="image" src="https://github.com/user-attachments/assets/df1d3b25-45de-4d1a-aef9-3bc4c09c734b" />
Conversas:
<img width="1296" height="955" alt="image" src="https://github.com/user-attachments/assets/aed15e47-036a-4765-b22e-2891313224a9" />
Kanban:
<img width="1292" height="953" alt="image" src="https://github.com/user-attachments/assets/9c0f2583-7079-4944-8484-087050d3e619" />
Cadatro de Usuários:
<img width="1294" height="949" alt="image" src="https://github.com/user-attachments/assets/b37df923-4c51-4c15-a2cd-c3c4eebd261a" />



## ⚠️ Status

🟡 **Em desenvolvimento ativo**

Algumas funcionalidades apresentadas neste README já estão implementadas, enquanto outras fazem parte do roadmap de evolução.

## 📄 Licença

Este projeto está disponível para fins de estudo e portfólio.

Consulte o arquivo `LICENSE` caso uma licença específica seja adicionada ao repositório.
