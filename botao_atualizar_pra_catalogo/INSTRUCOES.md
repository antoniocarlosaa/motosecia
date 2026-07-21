# Módulo de Atualização: Botão Compartilhar para Catálogo 🏍️

Este módulo foi criado para facilitar a adição de botões de compartilhamento em cada veículo em seus outros projetos de catálogo. Ele permite que os clientes compartilhem links diretos de um veículo (Deep Linking), abrindo o catálogo diretamente no modal com os detalhes daquele veículo.

A funcionalidade utiliza a API nativa do celular/navegador (`navigator.share`) para celulares (abrindo o menu de compartilhar com WhatsApp, Instagram, Telegram, etc.) e tem um fallback automático para computadores que copia o link diretamente para a área de transferência do usuário com um aviso visual ("Link Copiado!").

---

## Estrutura do Módulo
A pasta contém:
1. `ShareButton.tsx`: O componente React do botão.
2. `atualizar.js`: Script de atualização automática em Node.js.
3. `INSTRUCOES.md`: Este manual.

---

## 🚀 Método Automático (Recomendado)

Você pode aplicar esta atualização de forma 100% automatizada em outros projetos.

1. **Copie a pasta** `botao_atualizar_pra_catalogo` inteira para a pasta raiz do outro projeto de catálogo no seu computador.
2. Abra o terminal na raiz do outro projeto de catálogo.
3. Execute o seguinte comando:
   ```bash
   node botao_atualizar_pra_catalogo/atualizar.js
   ```
4. O script fará tudo sozinho:
   - Copiará o `ShareButton.tsx` para a pasta de componentes do projeto.
   - Atualizará o `VehicleCard.tsx` inserindo o botão de compartilhar.
   - Atualizará o `VehicleDetailModal.tsx` inserindo o botão no modal de detalhes.
   - Verificará se o suporte a Deep Linking está ativo no `App.tsx`.

---

## 🛠️ Método Manual (Alternativo)

Caso o projeto de destino seja muito personalizado e o script automático dê erro, faça o seguinte passo a passo:

### Passo 1: Copiar o Componente
1. Copie o arquivo `ShareButton.tsx` desta pasta e cole-o na pasta `components/` do projeto de destino.

### Passo 2: Adicionar ao Card de Veículo (`components/VehicleCard.tsx`)
1. Importe o componente no início do arquivo:
   ```typescript
   import ShareButton from './ShareButton';
   ```
2. Adicione o botão no canto superior direito da imagem do veículo (dentro da div que contém a tag `<img ... />` ou no final da área de mídia do veículo):
   ```tsx
   <ShareButton
     vehicleId={vehicle.id}
     vehicleName={vehicle.name}
     variant="floating"
     className="absolute top-3 right-3 z-30"
   />
   ```

### Passo 3: Adicionar ao Modal de Detalhes (`components/VehicleDetailModal.tsx`)
1. Importe o componente no início do arquivo:
   ```typescript
   import ShareButton from './ShareButton';
   ```
2. Adicione o botão de compartilhamento completo na lista de ações/botões (normalmente no final da div com a classe `className="flex flex-col gap-3 mt-4"`):
   ```tsx
   <ShareButton
     vehicleId={vehicle.id}
     vehicleName={vehicle.name}
     variant="full"
   />
   ```

### Passo 4: Habilitar o Deep Linking no arquivo principal (`App.tsx`)
Certifique-se de que o `App.tsx` saiba abrir o modal do veículo quando o site for acessado com o link compartilhado.

1. Dentro do componente `App`, certifique-se de que o estado do veículo selecionado exista:
   ```typescript
   const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
   ```
2. Adicione o seguinte `useEffect` para detectar parâmetros de URL ao carregar:
   ```typescript
   useEffect(() => {
     const params = new URLSearchParams(window.location.search);
     const vehicleId = params.get('v');
     if (vehicleId && vehicles.length > 0 && !selectedVehicle) {
       const found = vehicles.find(v => v.id === vehicleId);
       if (found) setSelectedVehicle(found);
     }
   }, [vehicles]);
   ```
   *(Este código lê o parâmetro `?v=ID` do link copiado e abre os detalhes do veículo correspondente automaticamente).*
