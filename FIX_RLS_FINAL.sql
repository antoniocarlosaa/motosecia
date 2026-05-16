-- 🚨 SCRIPT DE CORREÇÀO FINAL - RLS (Execute no SQL Editor do Supabase) 🚨

-- 1. Resetar Segurança da Tabela
ALTER TABLE vehicles DISABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- 2. Limpar TODAS as regras antigas (para evitar conflitos)
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON vehicles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON vehicles;
DROP POLICY IF EXISTS "Enable read for everyone" ON vehicles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON vehicles;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem inserir veículos" ON vehicles;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem atualizar veículos" ON vehicles;
DROP POLICY IF EXISTS "Veículos são visíveis para todos" ON vehicles;
DROP POLICY IF EXISTS "Users can insert their own vehicles" ON vehicles;

-- 3. CRIAR NOVA REGRA: PERMITIR TUDO PARA USUÁRIOS LOGADOS (O "LIBEROU GERAL" SEGURO)
-- Esta regra diz: "Se o usuário tem um 'crachá' (está logado), ele pode INSERIR qualquer veículo."
CREATE POLICY "Super Insert Policy"
ON vehicles FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. CRIAR REGRA DE ATUALIZAÇÀO
CREATE POLICY "Super Update Policy"
ON vehicles FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. CRIAR REGRA DE EXCLUSÀO
CREATE POLICY "Super Delete Policy"
ON vehicles FOR DELETE
TO authenticated
USING (true);

-- 6. CRIAR REGRA DE LEITURA (PÚBLICA - Site funciona para todos)
CREATE POLICY "Public Read Policy"
ON vehicles FOR SELECT
TO public
USING (true);

-- 7. Mostrar resultado
SELECT 'SUCESSO! Permissões Corrigidas. Pode cadastrar agora.' as STATUS;
