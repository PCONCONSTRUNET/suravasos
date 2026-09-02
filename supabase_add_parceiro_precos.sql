-- Cria a tabela de preços personalizados por parceiro
CREATE TABLE IF NOT EXISTS public.parceiro_precos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendedor_id UUID NOT NULL REFERENCES public.vendedores(id) ON DELETE CASCADE,
    produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,
    preco_personalizado NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(vendedor_id, produto_id)
);

-- Ativa RLS (opcional, dependendo de como as outras tabelas estão configuradas)
ALTER TABLE public.parceiro_precos ENABLE ROW LEVEL SECURITY;

-- Cria políticas básicas para leitura/escrita (ajuste se necessário para a sua estrutura)
CREATE POLICY "Permite leitura publica para parceiro_precos" ON public.parceiro_precos FOR SELECT USING (true);
CREATE POLICY "Permite inserção para usuarios autenticados" ON public.parceiro_precos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Permite atualização para usuarios autenticados" ON public.parceiro_precos FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Permite deleção para usuarios autenticados" ON public.parceiro_precos FOR DELETE USING (auth.role() = 'authenticated');
