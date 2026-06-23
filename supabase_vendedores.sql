-- 1. Criação da tabela de Vendedores Parceiros
CREATE TABLE public.vendedores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id), -- Vincula com o usuário de login
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  tipo_comissao TEXT NOT NULL DEFAULT 'porcentagem', -- 'porcentagem' ou 'fixo'
  valor_comissao NUMERIC NOT NULL DEFAULT 0, -- Ex: 10 (para 10%) ou 50 (para R$50)
  status TEXT DEFAULT 'Ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Adição de colunas na tabela de vendas existente
ALTER TABLE public.vendas
ADD COLUMN IF NOT EXISTS vendedor_id UUID REFERENCES public.vendedores(id),
ADD COLUMN IF NOT EXISTS status_aprovacao TEXT DEFAULT 'Aprovada', -- Vendas normais já nascem aprovadas
ADD COLUMN IF NOT EXISTS valor_comissao NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS status_pagamento_comissao TEXT DEFAULT 'Pendente';

-- 3. Correção para a tabela de clientes (se estiver faltando)
ALTER TABLE public.clientes
ADD COLUMN IF NOT EXISTS cpf_cnpj TEXT,
ADD COLUMN IF NOT EXISTS telefone TEXT;
