-- Migration: Adicionar colunas faltantes na tabela vendas
-- Execute este script no SQL Editor do Supabase

ALTER TABLE public.vendas
  ADD COLUMN IF NOT EXISTS condicao_pagamento TEXT,
  ADD COLUMN IF NOT EXISTS desconto_valor NUMERIC(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS desconto_percentual NUMERIC(5, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS numero INTEGER,
  ADD COLUMN IF NOT EXISTS metodo_pagamento TEXT,
  ADD COLUMN IF NOT EXISTS vendedor_id UUID REFERENCES public.vendedores(id),
  ADD COLUMN IF NOT EXISTS status_aprovacao TEXT;
