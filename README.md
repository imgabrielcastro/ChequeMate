Slide: https://www.canva.com/design/DAG0-FPtGX8/YWBjQ2itb8rBvHU_FYtKdQ/edit

ChequeMate - Sistema de Gerenciamento de Cheques 📱💰
Aplicativo React Native para gerenciar seus cheques de forma prática e eficiente.

📋 Funcionalidades Principais
✅ Dashboard com estatísticas financeiras

✅ Lista de cheques com busca e refresh

✅ Cadastro de novos cheques com cálculo de juros automático

✅ Detalhes completos de cada cheque

✅ Marcar como recebido ou cancelar cheques

✅ Multi-tenant (cada usuário vê apenas seus dados)

✅ Interface moderna e intuitiva

🚀 Como Usar
Pré-requisitos
Node.js 16+

React Native CLI

Android Studio (Android) ou Xcode (iOS)

Backend API rodando (veja configuração abaixo)

Instalação
# Clone o projeto
git clone https://github.com/seu-usuario/chequemate-mobile.git
cd chequemate-mobile

# Instale as dependências
npm install

# Configure a URL da API
# Edite: src/services/api.js
# Altere a baseURL para seu backend

# Execute no Android
npx react-native run-android


POST   /api/auth/login      - Login de usuário
GET    /api/cheques         - Listar cheques
GET    /api/cheques/:id     - Detalhes do cheque
POST   /api/cheques         - Criar cheque
PUT    /api/cheques/:id     - Atualizar cheque (receber/cancelar)
GET    /api/cheques/estatisticas - Estatísticas
GET    /api/clients         - Listar clientes (para cadastro)
🏗️ Estrutura do Projeto
text
src/
├── components/          # Componentes reutilizáveis
│   ├── Buttons/        # Botões customizados
│   ├── Inputs/         # Campos de formulário
│   ├── Stacks/         # Layouts (VStack, HStack)
│   └── Texts/          # Componentes de texto
├── screens/            # Telas do app
│   ├── Cheques/        # Tela principal de cheques
│   ├── NewCheque/      # Cadastro de cheque
│   └── ChequeDetails/  # Detalhes do cheque
├── services/           # Comunicação com API
├── themes/             # Cores e estilos
└── navigation/         # Configuração de rotas
📱 Telas
1. Login
Email e senha

Validação em tempo real

2. Dashboard
Total a receber

Total recebido este mês

Quantidade de cheques

3. Lista de Cheques
Pull-to-refresh

Busca por nome ou telefone

Cores por status do cheque

4. Cadastro de Cheque
Seleção de cliente

Data de vencimento

Valor + cálculo automático de juros

Número do cheque

5. Detalhes do Cheque
Todas as informações

Ações: Receber ou Cancelar

Histórico de datas

🎨 Tema Personalizável
Edite src/themes/theme.js para alterar cores:

javascript
export const theme = {
  colors: {
    primary: '#6200EE',    // Cor principal
    background: '#121212', // Fundo
    text: '#FFFFFF',       // Texto
    input: '#1E1E1E',      // Campos
  }
};
🛠️ Scripts Disponíveis
# Desenvolvimento
npm start                 # Inicia o Metro Bundler
npx react-native run-android  # Android
npx react-native run-ios      # iOS

# Build
cd android && ./gradlew assembleRelease  # APK release

# Limpeza
cd android && ./gradlew clean  # Limpa cache Android
🐛 Solução de Problemas
Erro: "Could not connect to development server"
# Android
adb reverse tcp:8081 tcp:8081

# Verifique o IP no api.js
Erro: "undefined is not an object"
Verifique se o backend está rodando

Confira se o token JWT está válido

App não atualiza
# Limpe cache
npm start -- --reset-cache
📦 Dependências Principais
react-native - Framework base

react-navigation - Navegação entre telas

react-native-paper - Componentes UI

axios - Chamadas HTTP

@react-native-community/datetimepicker - Seleção de datas

react-native-masked-text - Máscaras de input


