# Track Zone

Uma aplicação Next.js para rastreamento e gerenciamento de localizações de veículos com visualização em mapa.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando a Aplicação](#executando-a-aplicação)
- [Testes](#testes)
  - [Testes Unitários](#testes-unitários)
  - [Testes End-to-End](#testes-end-to-end)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Visão Geral

Track Zone é uma aplicação web que permite aos usuários rastrear e gerenciar veículos. Ela fornece uma interface de mapa para visualizar as localizações dos veículos e uma visualização em tabela para exibir detalhes dos veículos. Os usuários podem filtrar veículos por tipo e pesquisar veículos específicos por placa ou número de frota.

## Funcionalidades

- Mapa interativo mostrando localizações de veículos
- Visualização tabular de dados de veículos com paginação
- Filtragem entre veículos rastreados e outros
- Funcionalidade de busca por placa ou número de frota
- Alternância entre temas claro/escuro
- Design responsivo para desktop e mobile

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (v14.x ou posterior)
- [npm](https://www.npmjs.com/) (v6.x ou posterior) ou [yarn](https://yarnpkg.com/) (v1.22.x ou posterior)
- Uma chave de API do Google Maps para a funcionalidade de mapas

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/track-zone.git
cd track-zone
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` no diretório raiz com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=https://sua-api-url.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_api_google_maps
```

Para fins de desenvolvimento, você pode copiar o arquivo `.env.example`:

```bash
cp .env.example .env.local
```

Em seguida, edite o arquivo `.env.local` com seus valores específicos.

## Executando a Aplicação

### Modo de Desenvolvimento

Para executar a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Build de Produção

Para criar um build de produção:

```bash
npm run build
# ou
yarn build
```

Para iniciar o servidor de produção:

```bash
npm start
# ou
yarn start
```

## Testes

### Testes Unitários

O projeto utiliza Jest e React Testing Library para testes unitários.

Para executar todos os testes unitários:

```bash
npm test
# ou
yarn test
```

Para executar testes no modo de observação:

```bash
npm test -- --watch
# ou
yarn test --watch
```

Para executar testes para um componente específico:

```bash
npm test src/components/header
# ou
yarn test src/components/header
```

### Testes End-to-End

O projeto utiliza Cypress para testes end-to-end.

Para abrir o runner de testes do Cypress:

```bash
npm run cypress:open
# ou
yarn cypress:open
```

Para executar testes Cypress em modo headless:

```bash
npm run cypress:run
# ou
yarn cypress:run
```

Para executar tanto o servidor de desenvolvimento quanto os testes Cypress:

```bash
npm run cy:open
# ou
yarn cy:open
```

## Estrutura do Projeto

```
track-zone/
├── cypress/                 # Testes end-to-end do Cypress
│   ├── e2e/                 # Arquivos de teste
│   └── support/             # Arquivos e comandos de suporte
├── public/                  # Arquivos estáticos
├── src/
│   ├── app/                 # Diretório app do Next.js
│   ├── components/          # Componentes React
│   │   ├── filters/         # Componentes de filtragem
│   │   ├── header/          # Componentes de cabeçalho
│   │   ├── infiniteScrollContainer/ # Funcionalidade de rolagem infinita
│   │   ├── ui/              # Componentes de UI
│   │   ├── vehicleMap/      # Componentes de visualização de mapa
│   │   ├── vehicleMarker/   # Componentes de marcadores no mapa
│   │   └── vehicleTable/    # Componentes de tabela de dados de veículos
│   ├── contexts/            # Contextos React
│   ├── hooks/               # Hooks React personalizados
│   │   └── data/            # Hooks de busca de dados
│   └── interfaces/          # Interfaces TypeScript
├── .env.example             # Exemplo de variáveis de ambiente
├── .eslintrc.json          # Configuração do ESLint
├── cypress.config.ts       # Configuração do Cypress
├── jest.config.js          # Configuração do Jest
├── next.config.js          # Configuração do Next.js
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configuração do TypeScript
└── README.md               # Documentação do projeto
```

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React
- [React](https://reactjs.org/) - Biblioteca UI
- [TypeScript](https://www.typescriptlang.org/) - Verificação de tipos
- [Google Maps API](https://developers.google.com/maps) - Visualização de mapas
- [React Query](https://react-query.tanstack.com/) - Busca e cache de dados
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [Jest](https://jestjs.io/) - Testes unitários
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testes de componentes
- [Cypress](https://www.cypress.io/) - Testes end-to-end

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
