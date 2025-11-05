# Configuração do Supabase

Este guia mostra como configurar o Supabase para o Mini CRM.

## 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: `mini-crm` (ou nome de sua escolha)
   - **Database Password**: Crie uma senha forte e **guarde-a**
   - **Region**: Escolha a região mais próxima (ex: `South America (São Paulo)`)
5. Clique em **"Create new project"**
6. Aguarde alguns minutos até o projeto ser criado

## 2. Obter Credenciais

1. No painel do projeto, vá em **Settings** (⚙️) > **API**
2. Você verá duas informações importantes:
   - **Project URL**: algo como `https://xxxxx.supabase.co`
   - **anon public**: Uma chave longa começando com `eyJ...`

## 3. Configurar Variáveis de Ambiente

1. No projeto local, copie o arquivo de exemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Abra `.env.local` e preencha com suas credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
   ```

## 4. Executar SQL para Criar Tabelas

1. No painel do Supabase, vá em **SQL Editor** (ícone de código)
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (ou pressione `Ctrl+Enter`)
6. Aguarde a execução. Você verá a mensagem **"Success. No rows returned"**

## 5. Verificar Tabelas Criadas

1. Vá em **Table Editor** (ícone de tabela)
2. Você deve ver as seguintes tabelas:
   - `users`
   - `clients`
   - `notes`
   - `quotes`

## 6. Configurar Autenticação

1. Vá em **Authentication** > **Providers**
2. **Email** já vem habilitado por padrão
3. (Opcional) Configure **Confirm email** se quiser validação de email:
   - Vá em **Authentication** > **Email Templates**
   - Customize os templates de email se desejar

## 7. Testar Conexão

Após configurar tudo, você pode testar a conexão rodando o projeto:

```bash
npm run dev
```

Acesse `http://localhost:3000` e tente criar uma conta.

## 8. Row Level Security (RLS)

✅ O RLS já foi configurado automaticamente pelo SQL.

Isso significa que:
- Cada usuário só vê **seus próprios clientes**
- Não há risco de um usuário ver dados de outro
- A segurança é garantida no nível do banco de dados

## Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou corretamente a `anon key` do Supabase
- Certifique-se de que o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor Next.js (`npm run dev`)

### Erro: "Failed to fetch"
- Verifique se a URL do Supabase está correta
- Certifique-se de que o projeto do Supabase está ativo (não pausado)

### Erro ao executar SQL
- Execute o SQL em partes menores
- Verifique se não há erros de sintaxe
- Consulte os logs de erro no painel do Supabase

## Próximos Passos

Após configurar o Supabase:

1. ✅ Rode o projeto: `npm run dev`
2. ✅ Crie sua primeira conta em `/signup`
3. ✅ Faça login em `/login`
4. ✅ Comece a adicionar clientes!
