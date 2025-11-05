# Mini CRM - Gestão de Clientes para Autônomos

Um CRM simples e eficiente para prestadores de serviço que trabalham pelo WhatsApp.

##  Sobre o Projeto

O Mini CRM foi desenvolvido para facilitar a gestão de clientes de profissionais autônomos como:
- Manicures
- Barbeiros
- Maquiadores
- Eletricistas
- Personal Trainers
- Massagistas
- Fotógrafos
- E muitos outros!

##  Funcionalidades

-  **Autenticação**: Login e cadastro seguro com Supabase
-  **Dashboard de Clientes**: Visualize todos os seus clientes em cards organizados
-  **Busca e Filtros**: Encontre clientes rapidamente por nome, telefone ou serviço
-  **Status do Cliente**: Novo, Negociando, Fechado ou Perdido
-  **WhatsApp Direto**: Botão para abrir conversa no WhatsApp (funciona em mobile e desktop)
-  **Anotações**: Histórico de conversas e observações sobre cada cliente
-  **Geração de Orçamentos**: Crie orçamentos profissionais
-  **PDF**: Baixe orçamentos em PDF para enviar aos clientes
-  **Segurança**: Row Level Security (RLS) - cada usuário vê apenas seus dados

##  Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Supabase** (Autenticação + Banco de Dados)
- **TailwindCSS**
- **shadcn/ui** (Componentes UI)
- **react-pdf** (Geração de PDFs)
- **date-fns** (Formatação de datas)

##  Instalação

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

## Deploy na Vercel

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

##  Licença

Este projeto foi criado para uso pessoal e educacional.

##  Suporte

Se tiver dúvidas ou problemas, abra uma issue no repositório.