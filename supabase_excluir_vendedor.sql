-- Função para excluir permanentemente um vendedor e seu usuário de autenticação
-- Execute isso no SQL Editor do seu painel do Supabase.

CREATE OR REPLACE FUNCTION excluir_vendedor_e_usuario(p_vendedor_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- 1. Pega o user_id associado ao vendedor
    SELECT user_id INTO v_user_id FROM public.vendedores WHERE id = p_vendedor_id;

    -- 2. Desvincula o vendedor das vendas para não dar erro de chave estrangeira
    -- As vendas continuarão existindo no caixa, mas sem vendedor vinculado.
    UPDATE public.vendas SET vendedor_id = NULL WHERE vendedor_id = p_vendedor_id;

    -- 3. Exclui o vendedor da tabela public.vendedores
    DELETE FROM public.vendedores WHERE id = p_vendedor_id;

    -- 4. Exclui o usuário da tabela auth.users (isso exclui o login/email)
    IF v_user_id IS NOT NULL THEN
        DELETE FROM auth.users WHERE id = v_user_id;
    END IF;
END;
$$;
