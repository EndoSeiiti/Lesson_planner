CREATE TABLE planos_aula (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestampz DEFAULT now(),
  tema_aula text NOT NULL,
  serie_ano text NOT NULL,
  componente_curricular text NOT NULL,
  duracao_aula text NOT NULL,
  plano_json jsonb NOT NULL,
  professor text NOT NULL
);