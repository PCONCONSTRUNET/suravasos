-- Adiciona a coluna acrescimo_catalogo na tabela de vendedores
ALTER TABLE public.vendedores
ADD COLUMN acrescimo_catalogo BOOLEAN DEFAULT false;
