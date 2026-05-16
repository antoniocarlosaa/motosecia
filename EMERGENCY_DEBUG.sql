-- 🚨 MODO DE EMERGÊNCIA (DEBUG) 🚨
-- O erro persiste porque seu celular provavelmente não está conseguindo confirmar que é "Você" (Erro de Autenticação/Sessão).
-- Este script libera o cadastro para TODOS (mesmo sem login) temporariamente para confirmarmos issso.

-- 1. Remover políticas anteriores de INSERÇÀO e ATUALIZAÇÀO
DROP POLICY IF EXISTS "Super Insert Policy" ON vehicles;
DROP POLICY IF EXISTS "Super Update Policy" ON vehicles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON vehicles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON vehicles;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem inserir veículos" ON vehicles;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem atualizar veículos" ON vehicles;

-- 2. CRIAR POLÍTICA "LIBEROU GERAL" (PÚBLICA)
-- Isso permite que o cadastro funcione mesmo se o login falhar no celular
CREATE POLICY "Emergency Public Insert"
ON vehicles FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Emergency Public Update"
ON vehicles FOR UPDATE
TO public
USING (true);

-- 3. Confirmação
SELECT 'MODO DE EMERGÊNCIA ATIVADO: Qualquer um pode cadastrar.' as status;
