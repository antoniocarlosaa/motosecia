-- 🚨 SCRIPT DE CORREÇÀO FINAL - SETTINGS (Execute no SQL Editor do Supabase) 🚨

-- 1. Cria a tabela settings se não existir
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_numbers TEXT[],
  google_maps_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Adiciona colunas faltantes (se não existirem)
ALTER TABLE settings ADD COLUMN IF NOT EXISTS background_image_url TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS background_position TEXT DEFAULT '50% 50%';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS card_image_fit TEXT DEFAULT 'cover';

-- 3. Resetar Segurança da Tabela SETTINGS
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 4. Limpar regras antigas de settings
DROP POLICY IF EXISTS "Configurações são visíveis para todos" ON settings;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem atualizar configurações" ON settings;
DROP POLICY IF EXISTS "Super Settings Insert" ON settings;
DROP POLICY IF EXISTS "Super Settings Update" ON settings;
DROP POLICY IF EXISTS "Super Settings Select" ON settings;

-- 5. CRIAR NOVA REGRA: PERMITIR TUDO PARA USUÁRIOS LOGADOS
CREATE POLICY "Super Settings Insert"
ON settings FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Super Settings Update"
ON settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. CRIAR REGRA DE LEITURA PÚBLICA (Necessário para carregar o site)
CREATE POLICY "Super Settings Select"
ON settings FOR SELECT
TO public
USING (true);

-- 7. Inserir registro inicial se tabela estiver vazia
INSERT INTO settings (whatsapp_numbers, google_maps_url, background_position, card_image_fit)
SELECT ARRAY[]::TEXT[], '', '50% 50%', 'cover'
WHERE NOT EXISTS (SELECT 1 FROM settings);

-- 8. Mostrar resultado
SELECT 'SUCESSO! Tabela Settings corrigida e colunas adicionadas.' as STATUS;
