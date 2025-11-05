-- Extensões necessárias
create extension if not exists "uuid-ossp";

-- Tabela de usuários (estende o auth.users do Supabase)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de clientes
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  phone text,
  service text,
  budget numeric,
  status text default 'novo' check (status in ('novo', 'negociando', 'fechado', 'perdido')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de anotações
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de orçamentos
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade not null,
  service text not null,
  value numeric not null,
  deadline text,
  terms text,
  status text default 'enviado' check (status in ('enviado', 'aceito', 'rejeitado')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.clients enable row level security;
alter table public.notes enable row level security;
alter table public.quotes enable row level security;

-- Políticas RLS para users
-- Cada usuário só pode ver e editar seus próprios dados
create policy "Usuários podem ver seus próprios dados"
  on public.users for select
  using (auth.uid() = id);

create policy "Usuários podem atualizar seus próprios dados"
  on public.users for update
  using (auth.uid() = id);

create policy "Usuários podem inserir seus próprios dados"
  on public.users for insert
  with check (auth.uid() = id);

-- Políticas RLS para clients
-- Cada usuário só pode ver e manipular seus próprios clientes
create policy "Usuários podem ver seus próprios clientes"
  on public.clients for select
  using (auth.uid() = user_id);

create policy "Usuários podem criar seus próprios clientes"
  on public.clients for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar seus próprios clientes"
  on public.clients for update
  using (auth.uid() = user_id);

create policy "Usuários podem deletar seus próprios clientes"
  on public.clients for delete
  using (auth.uid() = user_id);

-- Políticas RLS para notes
-- Cada usuário só pode ver e manipular anotações dos seus clientes
create policy "Usuários podem ver anotações dos seus clientes"
  on public.notes for select
  using (
    exists (
      select 1 from public.clients
      where clients.id = notes.client_id
      and clients.user_id = auth.uid()
    )
  );

create policy "Usuários podem criar anotações nos seus clientes"
  on public.notes for insert
  with check (
    exists (
      select 1 from public.clients
      where clients.id = notes.client_id
      and clients.user_id = auth.uid()
    )
  );

create policy "Usuários podem deletar anotações dos seus clientes"
  on public.notes for delete
  using (
    exists (
      select 1 from public.clients
      where clients.id = notes.client_id
      and clients.user_id = auth.uid()
    )
  );

-- Políticas RLS para quotes
-- Cada usuário só pode ver e manipular orçamentos dos seus clientes
create policy "Usuários podem ver orçamentos dos seus clientes"
  on public.quotes for select
  using (
    exists (
      select 1 from public.clients
      where clients.id = quotes.client_id
      and clients.user_id = auth.uid()
    )
  );

create policy "Usuários podem criar orçamentos nos seus clientes"
  on public.quotes for insert
  with check (
    exists (
      select 1 from public.clients
      where clients.id = quotes.client_id
      and clients.user_id = auth.uid()
    )
  );

create policy "Usuários podem atualizar orçamentos dos seus clientes"
  on public.quotes for update
  using (
    exists (
      select 1 from public.clients
      where clients.id = quotes.client_id
      and clients.user_id = auth.uid()
    )
  );

create policy "Usuários podem deletar orçamentos dos seus clientes"
  on public.quotes for delete
  using (
    exists (
      select 1 from public.clients
      where clients.id = quotes.client_id
      and clients.user_id = auth.uid()
    )
  );

-- Função para atualizar o campo updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger para atualizar updated_at na tabela clients
create trigger on_clients_updated
  before update on public.clients
  for each row
  execute procedure public.handle_updated_at();

-- Função para criar usuário na tabela users automaticamente após signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para criar usuário automaticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
