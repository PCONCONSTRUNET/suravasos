-- Adiciona a coluna acrescimo_catalogo_percentual na tabela de vendedores
-- O valor padrão é 20, para manter o comportamento dos 20% para quem já tinha o acréscimo ativado
ALTER TABLE public.vendedores
ADD COLUMN acrescimo_catalogo_percentual NUMERIC DEFAULT 20;
