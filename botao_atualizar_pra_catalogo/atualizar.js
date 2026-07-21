const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

console.log(`${colors.bright}${colors.cyan}==================================================`);
console.log(`🚀 INICIANDO ATUALIZAÇÃO: BOTÃO COMPARTILHAR PARA CATÁLOGO`);
console.log(`==================================================${colors.reset}\n`);

// 1. Resolve Paths
const scriptDir = __dirname;
const projectRoot = path.join(scriptDir, '..');
const componentsDir = path.join(projectRoot, 'components');

const shareButtonSrc = path.join(scriptDir, 'ShareButton.tsx');
const shareButtonDest = path.join(componentsDir, 'ShareButton.tsx');
const vehicleCardPath = path.join(componentsDir, 'VehicleCard.tsx');
const vehicleDetailModalPath = path.join(componentsDir, 'VehicleDetailModal.tsx');
const appPath = path.join(projectRoot, 'App.tsx');

// Helper to check if file exists
const exists = (filePath) => fs.existsSync(filePath);

// Step 1: Copy ShareButton.tsx component
console.log(`${colors.bright}${colors.blue}[1/4] Copiando componente ShareButton.tsx...${colors.reset}`);
try {
  if (!exists(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
    console.log(`   📂 Pasta 'components' criada.`);
  }

  if (exists(shareButtonSrc)) {
    fs.copyFileSync(shareButtonSrc, shareButtonDest);
    console.log(`   ✅ Componente copiado para: ${colors.green}${shareButtonDest}${colors.reset}`);
  } else {
    throw new Error(`Arquivo de origem não encontrado em ${shareButtonSrc}`);
  }
} catch (err) {
  console.error(`   ❌ Erro ao copiar o componente: ${err.message}`);
  process.exit(1);
}

// Step 2: Modify VehicleCard.tsx
console.log(`\n${colors.bright}${colors.blue}[2/4] Atualizando VehicleCard.tsx...${colors.reset}`);
if (!exists(vehicleCardPath)) {
  console.log(`   ⚠️  Arquivo ${vehicleCardPath} não encontrado neste projeto. Pulando...`);
} else {
  try {
    let content = fs.readFileSync(vehicleCardPath, 'utf8');

    // Add import if not present
    if (!content.includes("import ShareButton from './ShareButton'")) {
      const importAnchor = "import { Vehicle, VehicleType } from '../types';";
      const importAnchorAlt = "import { Vehicle } from '../types';";

      if (content.includes(importAnchor)) {
        content = content.replace(
          importAnchor,
          `${importAnchor}\nimport ShareButton from './ShareButton';`
        );
        console.log(`   ✅ Importação do ShareButton adicionada.`);
      } else if (content.includes(importAnchorAlt)) {
        content = content.replace(
          importAnchorAlt,
          `${importAnchorAlt}\nimport ShareButton from './ShareButton';`
        );
        console.log(`   ✅ Importação do ShareButton adicionada (âncora alternativa).`);
      } else {
        // Fallback: add to the very top after the first import line
        const lines = content.split(/\r?\n/);
        lines.splice(2, 0, "import ShareButton from './ShareButton';");
        content = lines.join('\n');
        console.log(`   ✅ Importação do ShareButton adicionada no topo do arquivo.`);
      }
    } else {
      console.log(`   ℹ️  Importação do ShareButton já existe.`);
    }

    // Add button markup if not present
    if (!content.includes('vehicleId={vehicle.id}') || !content.includes('variant="floating"')) {
      // Find the closing div of the media container
      // Anchor 1: End of dynamicBadges block
      const badgeAnchor = 'dynamicBadges.map';
      const defaultInfoAnchor = 'INFO CONTENT FOR DEFAULT VARIANT';
      const isFeaturedAnchor = '!isFeatured && (';

      let success = false;

      // Safe insertion by finding the closing tag of media area
      if (content.includes(defaultInfoAnchor)) {
        const parts = content.split(defaultInfoAnchor);
        const beforeInfo = parts[0];
        const lastDivIndex = beforeInfo.lastIndexOf('</div>');

        if (lastDivIndex !== -1) {
          content =
            beforeInfo.substring(0, lastDivIndex) +
            `  <ShareButton\n          vehicleId={vehicle.id}\n          vehicleName={vehicle.name}\n          variant="floating"\n          className="absolute top-3 right-3 z-30"\n        />\n      ` +
            beforeInfo.substring(lastDivIndex) +
            defaultInfoAnchor +
            parts[1];
          success = true;
        }
      }

      if (!success && content.includes(isFeaturedAnchor)) {
        const parts = content.split(isFeaturedAnchor);
        const beforeInfo = parts[0];
        const lastDivIndex = beforeInfo.lastIndexOf('</div>');

        if (lastDivIndex !== -1) {
          content =
            beforeInfo.substring(0, lastDivIndex) +
            `  <ShareButton\n          vehicleId={vehicle.id}\n          vehicleName={vehicle.name}\n          variant="floating"\n          className="absolute top-3 right-3 z-30"\n        />\n      ` +
            beforeInfo.substring(lastDivIndex) +
            isFeaturedAnchor +
            parts[1];
          success = true;
        }
      }

      if (success) {
        fs.writeFileSync(vehicleCardPath, content, 'utf8');
        console.log(`   ✅ Botão de Compartilhar integrado ao Card do Veículo.`);
      } else {
        console.log(
          `   ❌ Não foi possível encontrar a posição automática no HTML de VehicleCard.tsx.\n      Por favor, insira o componente manualmente conforme as instruções.`
        );
      }
    } else {
      console.log(`   ℹ️  O botão de compartilhar já está integrado no VehicleCard.`);
    }
  } catch (err) {
    console.error(`   ❌ Erro ao modificar VehicleCard.tsx: ${err.message}`);
  }
}

// Step 3: Modify VehicleDetailModal.tsx
console.log(`\n${colors.bright}${colors.blue}[3/4] Atualizando VehicleDetailModal.tsx...${colors.reset}`);
if (!exists(vehicleDetailModalPath)) {
  console.log(`   ⚠️  Arquivo ${vehicleDetailModalPath} não encontrado neste projeto. Pulando...`);
} else {
  try {
    let content = fs.readFileSync(vehicleDetailModalPath, 'utf8');

    // Add import if not present
    if (!content.includes("import ShareButton from './ShareButton'")) {
      const importAnchor = "import { Vehicle } from '../types';";
      if (content.includes(importAnchor)) {
        content = content.replace(
          importAnchor,
          `${importAnchor}\nimport ShareButton from './ShareButton';`
        );
        console.log(`   ✅ Importação do ShareButton adicionada.`);
      } else {
        const lines = content.split(/\r?\n/);
        lines.splice(2, 0, "import ShareButton from './ShareButton';");
        content = lines.join('\n');
        console.log(`   ✅ Importação do ShareButton adicionada no topo do arquivo.`);
      }
    } else {
      console.log(`   ℹ️  Importação do ShareButton já existe.`);
    }

    // Add button markup if not present
    if (!content.includes('variant="full"')) {
      const actionContainerAnchor = 'className="flex flex-col gap-3 mt-4"';
      let success = false;

      if (content.includes(actionContainerAnchor)) {
        const parts = content.split(actionContainerAnchor);
        const afterContainerStart = parts[1];
        
        // Find the first closing </div> for this container
        // Since we have nested elements, we look for the pattern ")}\n                    </div>"
        const closingPattern = ')}\n                    </div>';
        const closingPatternCRLF = ')}\r\n                    </div>';
        
        if (afterContainerStart.includes(closingPattern)) {
          const replacement = `)}\n\n                        <ShareButton\n                            vehicleId={vehicle.id}\n                            vehicleName={vehicle.name}\n                            variant="full"\n                        />\n                    </div>`;
          content = parts[0] + actionContainerAnchor + afterContainerStart.replace(closingPattern, replacement);
          success = true;
        } else if (afterContainerStart.includes(closingPatternCRLF)) {
          const replacement = `)}\r\n\r\n                        <ShareButton\r\n                            vehicleId={vehicle.id}\r\n                            vehicleName={vehicle.name}\r\n                            variant="full"\r\n                        />\r\n                    </div>`;
          content = parts[0] + actionContainerAnchor + afterContainerStart.replace(closingPatternCRLF, replacement);
          success = true;
        }
      }

      if (success) {
        fs.writeFileSync(vehicleDetailModalPath, content, 'utf8');
        console.log(`   ✅ Botão de Compartilhar integrado ao Modal de Detalhes.`);
      } else {
        console.log(
          `   ❌ Não foi possível encontrar o container de ações no HTML de VehicleDetailModal.tsx.\n      Por favor, insira o componente manualmente conforme as instruções.`
        );
      }
    } else {
      console.log(`   ℹ️  O botão de compartilhar já está integrado no VehicleDetailModal.`);
    }
  } catch (err) {
    console.error(`   ❌ Erro ao modificar VehicleDetailModal.tsx: ${err.message}`);
  }
}

// Step 4: Verify App.tsx Deep Linking
console.log(`\n${colors.bright}${colors.blue}[4/4] Verificando suporte a Deep Linking em App.tsx...${colors.reset}`);
if (!exists(appPath)) {
  console.log(`   ⚠️  Arquivo ${appPath} não encontrado neste projeto. Pulando...`);
} else {
  try {
    const content = fs.readFileSync(appPath, 'utf8');
    const hasDeepLinking = content.includes("params.get('v')") || content.includes('location.search');

    if (hasDeepLinking) {
      console.log(`${colors.green}   ✅ Excelente! Suporte a Deep Linking já está ativado no App.tsx.${colors.reset}`);
    } else {
      console.log(`${colors.yellow}   ⚠️  Aviso: Não detectamos a lógica de Deep Linking no App.tsx.${colors.reset}`);
      console.log(`      Para que os links compartilhados funcionem (abrindo o veículo correto na carga da página),`);
      console.log(`      certifique-se de adicionar o seguinte useEffect em seu App.tsx:\n`);
      console.log(`${colors.cyan}      --------------------------------------------------`);
      console.log(`      // Adicione isso dentro do componente App:`);
      console.log(`      useEffect(() => {`);
      console.log(`        const params = new URLSearchParams(window.location.search);`);
      console.log(`        const vehicleId = params.get('v');`);
      console.log(`        if (vehicleId && vehicles.length > 0 && !selectedVehicle) {`);
      console.log(`          const found = vehicles.find(v => v.id === vehicleId);`);
      console.log(`          if (found) setSelectedVehicle(found);`);
      console.log(`        }`);
      console.log(`      }, [vehicles]);`);
      console.log(`      --------------------------------------------------${colors.reset}\n`);
    }
  } catch (err) {
    console.error(`   ❌ Erro ao ler App.tsx: ${err.message}`);
  }
}

console.log(`\n${colors.bright}${colors.green}==================================================`);
console.log(`✔ PROCESSO DE ATUALIZAÇÃO CONCLUÍDO COM SUCESSO!`);
console.log(`==================================================${colors.reset}\n`);
