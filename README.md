# Mini CRM - Gestão de Clientes para Autônomos

Um CRM simples e eficiente para prestadores de serviço que trabalham pelo WhatsApp.

## 🎯 Sobre o Projeto

O Mini CRM foi desenvolvido para facilitar a gestão de clientes de profissionais autônomos como:
- Manicures
- Barbeiros
- Maquiadores
- Eletricistas
- Personal Trainers
- Massagistas
- Fotógrafos
- E muitos outros!

## ✨ Funcionalidades

- ✅ **Autenticação**: Login e cadastro seguro com Supabase
- ✅ **Dashboard de Clientes**: Visualize todos os seus clientes em cards organizados
- ✅ **Busca e Filtros**: Encontre clientes rapidamente por nome, telefone ou serviço
- ✅ **Status do Cliente**: Novo, Negociando, Fechado ou Perdido
- ✅ **WhatsApp Direto**: Botão para abrir conversa no WhatsApp (funciona em mobile e desktop)
- ✅ **Anotações**: Histórico de conversas e observações sobre cada cliente
- ✅ **Geração de Orçamentos**: Crie orçamentos profissionais
- ✅ **PDF**: Baixe orçamentos em PDF para enviar aos clientes
- ✅ **Segurança**: Row Level Security (RLS) - cada usuário vê apenas seus dados

## 🛠 Stack Tecnológica

- **Next.js 14** (App Router)
- **TypeScript**
- **Supabase** (Autenticação + Banco de Dados)
- **TailwindCSS**
- **shadcn/ui** (Componentes UI)
- **react-pdf** (Geração de PDFs)
- **date-fns** (Formatação de datas)

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd crmbuild
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar Supabase

Siga as instruções detalhadas no arquivo [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

Resumo rápido:
1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o SQL do arquivo `supabase/schema.sql` no SQL Editor
3. Copie suas credenciais

### 4. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e preencha com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy na Vercel

### Passo 1: Preparar o projeto

Certifique-se de que tudo está commitado:

```bash
git add .
git commit -m "feat: Mini CRM completo"
git push
```

### Passo 2: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Importe seu repositório
4. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clique em **"Deploy"**

Pronto! Seu CRM estará online em poucos minutos.

## 📱 Como Usar

### Primeiro Acesso

1. Acesse o site e clique em **"Criar conta"**
2. Preencha seu nome, email e senha
3. Você será redirecionado para o Dashboard

### Adicionar Cliente

1. No Dashboard, clique em **"Adicionar Cliente"**
2. Preencha os dados:
   - Nome (obrigatório)
   - Telefone
   - Serviço desejado
   - Orçamento previsto
3. Clique em **"Adicionar"**

### Ver Detalhes do Cliente

1. No Dashboard, clique em **"Ver Detalhes"** no card do cliente
2. Você verá:
   - Informações completas
   - Botão para WhatsApp
   - Histórico de anotações
   - Botão para gerar orçamento

### Adicionar Anotação

1. Na página do cliente, role até "Histórico de Anotações"
2. Digite sua anotação no campo de texto
3. Clique em **"Adicionar Nota"**

### Gerar Orçamento

1. Na página do cliente, clique em **"Gerar Orçamento"**
2. Preencha:
   - Serviço (obrigatório)
   - Valor (obrigatório)
   - Prazo
   - Condições de pagamento
3. Clique em **"Gerar PDF"**
4. Baixe o PDF e envie ao cliente

### Filtrar Clientes

No Dashboard, use os badges para filtrar:
- **Todos**: Mostra todos os clientes
- **Novos**: Apenas clientes novos
- **Negociando**: Clientes em negociação
- **Fechados**: Negócios fechados
- **Perdidos**: Negócios perdidos

### Buscar Cliente

Digite no campo de busca para filtrar por:
- Nome
- Telefone
- Serviço

## 📂 Estrutura do Projeto

```
crmbuild/
├── app/                      # Rotas e páginas do Next.js
│   ├── actions/             # Server Actions
│   │   ├── auth.ts          # Autenticação
│   │   ├── clients.ts       # Gestão de clientes
│   │   ├── notes.ts         # Anotações
│   │   └── quotes.ts        # Orçamentos
│   ├── clients/[id]/        # Página de detalhes do cliente
│   ├── dashboard/           # Dashboard principal
│   ├── login/               # Página de login
│   ├── signup/              # Página de cadastro
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial (redireciona)
├── components/              # Componentes React
│   ├── ui/                  # Componentes shadcn/ui
│   ├── client-card.tsx      # Card de cliente
│   ├── client-filters.tsx   # Filtros de status
│   ├── client-info.tsx      # Informações do cliente
│   ├── client-notes.tsx     # Notas do cliente
│   ├── quote-form.tsx       # Formulário de orçamento
│   ├── quote-pdf-viewer.tsx # Visualizador de PDF
│   └── ...                  # Outros componentes
├── lib/                     # Utilitários
│   ├── supabase/           # Configuração Supabase
│   └── utils/              # Funções auxiliares
├── supabase/               # Arquivos SQL
│   └── schema.sql          # Tabelas e RLS
├── .env.local.example      # Exemplo de variáveis
├── SUPABASE_SETUP.md       # Guia de configuração
└── README.md               # Este arquivo
```

## 🔒 Segurança

O projeto implementa Row Level Security (RLS) no Supabase, garantindo que:
- Cada usuário vê **apenas seus próprios dados**
- Não há risco de vazamento de informações entre usuários
- A segurança é garantida no nível do banco de dados

## 🎨 Personalização

### Cores

As cores principais estão definidas em `app/globals.css`. Para alterar o tema:

1. Acesse [ui.shadcn.com/themes](https://ui.shadcn.com/themes)
2. Escolha suas cores
3. Copie o CSS gerado
4. Cole em `app/globals.css`

### Logo

Para adicionar seu logo:

1. Edite o componente `Header` em `components/header.tsx`
2. Adicione uma imagem ou substitua o texto

## 🐛 Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou a `anon key` correta do Supabase
- Certifique-se de que o `.env.local` está na raiz
- Reinicie o servidor (`npm run dev`)

### Erro: "Failed to fetch"
- Verifique se a URL do Supabase está correta
- Certifique-se de que o projeto do Supabase está ativo

### PDF não baixa
- Verifique se o `@react-pdf/renderer` está instalado
- Teste em outro navegador
- Limpe o cache do navegador

## 📝 Licença

Este projeto foi criado para uso pessoal e educacional.

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests!

## 📧 Suporte

Se tiver dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para facilitar a vida de profissionais autônomos**
