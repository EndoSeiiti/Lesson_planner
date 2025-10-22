create table public.rubrica_avaliacao (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  criterio text not null,
  nivel_alto text not null,
  nivel_baixo text not null,
  id_plano uuid not null,
  constraint rubrica_avaliacao_pkey primary key (id),
  constraint rubrica_avaliacao_id_plano_fkey foreign KEY (id_plano) references planos_aula (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create table public.planos_aula (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  tema text not null,
  serie_ano text not null,
  componente_curricular text not null,
  professor text not null,
  duracao_minutos smallint not null,
  objetivo text not null,
  introducao_ludica text not null,
  constraint Planos de aula_pkey primary key (id)
) TABLESPACE pg_default;


create table public.rubrica_avaliacao (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  criterio text not null,
  nivel_alto text not null,
  nivel_baixo text not null,
  id_plano uuid not null,
  constraint rubrica_avaliacao_pkey primary key (id),
  constraint rubrica_avaliacao_id_plano_fkey foreign KEY (id_plano) references planos_aula (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;