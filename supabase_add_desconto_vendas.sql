-- Adiciona colunas de desconto e subtotal na tabela vendas
-- para que os PDFs de orçamento e comprovante de venda possam exibir os descontos

ALTER TABLE vendas
  ADD COLUMN IF NOT EXISTS subtotal NUMERIC(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS desconto_valor NUMERIC(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS desconto_percentual NUMERIC(5, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS frete_valor NUMERIC(12, 2) DEFAULT 0;

COMMENT ON COLUMN vendas.subtotal IS 'Soma dos itens antes do desconto e frete';
COMMENT ON COLUMN vendas.desconto_valor IS 'Valor de desconto aplicado na venda (em R$)';
COMMENT ON COLUMN vendas.desconto_percentual IS 'Percentual de desconto aplicado (%)';
COMMENT ON COLUMN vendas.frete_valor IS 'Valor do frete';
