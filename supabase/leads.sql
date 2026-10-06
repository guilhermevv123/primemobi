-- Cadastros do site Prime Mobi (Supabase projeto primemobi / ycgocezwmsxwtrubfogu)
-- O site (chave pública) só consegue GRAVAR um cadastro novo.
-- Ler e atualizar só pelo painel, com a senha do painel (funções abaixo).

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  criado_em   timestamptz not null default now(),
  nome        text not null check (char_length(nome) between 2 and 120),
  whatsapp    text not null check (whatsapp ~ '^55[0-9]{10,11}$'),
  modelo      text not null check (char_length(modelo) <= 80),
  modelo_id   text check (char_length(modelo_id) <= 40),
  cor         text check (char_length(cor) <= 80),
  cidade      text check (char_length(cidade) <= 80),
  pagamento   text check (char_length(pagamento) <= 60),
  prazo       text check (char_length(prazo) <= 40),
  test_drive  boolean not null default false,
  observacao  text check (char_length(observacao) <= 1000),
  origem      jsonb not null default '{}'::jsonb check (pg_column_size(origem) < 4000),
  status      text not null default 'Novo' check (status in ('Novo', 'Em atendimento', 'Vendido', 'Perdido')),
  nota        text check (char_length(nota) <= 2000),
  atualizado_em timestamptz
);
create index if not exists leads_criado_em on public.leads (criado_em desc);

alter table public.leads enable row level security;

-- O site grava só cadastros novos, sem escolher status/nota.
drop policy if exists "site grava cadastro" on public.leads;
create policy "site grava cadastro" on public.leads
  for insert to anon
  with check (status = 'Novo' and nota is null and atualizado_em is null);

revoke all on public.leads from anon, authenticated;
grant insert (nome, whatsapp, modelo, modelo_id, cor, cidade, pagamento, prazo, test_drive, observacao, origem)
  on public.leads to anon;

-- Senha do painel (guardada só como hash)
create table if not exists public.painel_acesso (
  id int primary key default 1 check (id = 1),
  senha_hash text not null
);
alter table public.painel_acesso enable row level security;
revoke all on public.painel_acesso from anon, authenticated;

create or replace function public.painel_confere(p_senha text) returns boolean
language sql security definer set search_path = public, extensions stable as $$
  select exists (select 1 from painel_acesso where senha_hash = crypt(p_senha, senha_hash));
$$;

create or replace function public.painel_leads(p_senha text)
returns setof public.leads
language plpgsql security definer set search_path = public, extensions stable as $$
begin
  if not painel_confere(p_senha) then
    perform pg_sleep(1);
    raise exception 'senha_invalida' using errcode = '28P01';
  end if;
  return query select * from leads order by criado_em desc limit 5000;
end $$;

create or replace function public.painel_atualizar(p_senha text, p_id bigint, p_status text, p_nota text)
returns public.leads
language plpgsql security definer set search_path = public, extensions as $$
declare r leads;
begin
  if not painel_confere(p_senha) then
    perform pg_sleep(1);
    raise exception 'senha_invalida' using errcode = '28P01';
  end if;
  update leads set status = coalesce(p_status, status), nota = p_nota, atualizado_em = now()
   where id = p_id returning * into r;
  return r;
end $$;

revoke all on function public.painel_confere(text) from public, anon, authenticated;
revoke all on function public.painel_leads(text) from public;
revoke all on function public.painel_atualizar(text, bigint, text, text) from public;
grant execute on function public.painel_leads(text) to anon;
grant execute on function public.painel_atualizar(text, bigint, text, text) to anon;
